# Copyright (c) 2024, Andrea N. Glaus aka NDG-Remote and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Product(Document):
    def before_naming(self):
        user_name = frappe.get_value("User", self.owner, "username")
        self.giver_user_name = user_name

    def after_insert(self):
        self.append_product_to_cht()

    def on_trash(self):
        self.delete_child()

	# Append product to Doctype: Giver Profile Child Table Products, if not there yet
	# Get giver profile name
    def get_giver_profile(self):
        giver_profile = frappe.get_list("Giver Profile", filters={
        	'user_name': self.giver_user_name
    	}, pluck="name")
        if giver_profile:
            return giver_profile[0]
        else:
            return None

    # Get Child table list
    def get_current_cht_products(self):
        giver_profile = self.get_giver_profile()
        if giver_profile:
            doc = frappe.get_doc("Giver Profile", giver_profile)
            current_product_list = [p.product for p in doc.products]
            return current_product_list
        return []

	# Check if product in child table
    def is_product_in_cht(self):
        current_product_list = self.get_current_cht_products()
        return self.name in current_product_list

	# Append product if not in list
    def append_product_to_cht(self):
        # is_product_in_childtable 
        if not self.is_product_in_cht():
            giver_profile_name = self.get_giver_profile()
            if giver_profile_name:
                doc = frappe.get_doc("Giver Profile", giver_profile_name)
                doc.append("products", {'product': self.name})
                doc.save()

    def delete_child(self):
        # is_product_in_childtable
        if self.is_product_in_cht():
            child_name = frappe.get_list("Product Item", filters={'product': self.name}, fields=['name'], pluck="name")
            child = frappe.get_doc("Product Item", child_name)
            child.delete()