// Copyright (c) 2024, Andrea N. Glaus aka NDG-Remote and contributors
// For license information, please see license.txt

frappe.ui.form.on("Taker Profile", {
	refresh(frm) {
		frm.add_custom_button(__("Offer Product"), function () {
            console.log("User:", frm.doc.user);
            frappe.call({
                method: "frappe.client.get_list",
                args: {
                    doctype: "Giver Profile",
                    filters: {"user": frm.doc.user},
                },
                callback: function (r) {
                    if (!r.message || r.message.length === 0) {
                        console.log(r.message);
                        console.log("No giver profile found, showing dialog");
                        let d = new frappe.ui.Dialog({
                            title: 'Please fill out this information about you to start offering products',
                            fields: [
                                {
                                    label: 'First Name',
                                    fieldname: 'first_name',
                                    fieldtype: 'Data'
                                },
                                {
                                    label: 'Last Name',
                                    fieldname: 'last_name',
                                    fieldtype: 'Data'
                                },
                                {
                                    label: 'Bio',
                                    fieldname: 'bio',
                                    fieldtype: 'Small Text'
                                }
                            ],
                            size: 'small',
                            primary_action_label: 'Submit',
                            primary_action(values) {
                                frappe.call({
                                    method: "vicinu.api.create_giver_profile",
                                    args: {
                                        taker_profile: frm.doc.name,
                                        user: frm.doc.user,
                                        first_name: values.first_name,
                                        last_name: values.last_name,
                                        bio: values.bio
                                    },
                                });
                                d.hide();
                            }
                        });
                        d.show();
                    } else {
                        console.log(r.message);
                        console.log("Giver profile found, showing dialog for adding offer");
                        let d = new frappe.ui.Dialog({
                            title: 'What Product do you want to offer?',
                            fields: [
                                {
                                    label: 'Product',
                                    fieldname: 'product',
                                    fieldtype: 'Link',
                                    options: 'Product',
                                    reqd: 1
                                },
                                {
                                    label: 'Accessible',
                                    fieldname: 'is_accessible',
                                    fieldtype: 'Check'
                                },
                                {
                                    label: 'Donation required',
                                    fieldname: 'is_donation_required',
                                    fieldtype: 'Check'
                                },
                                {
                                    label: 'Description',
                                    fieldname: 'description',
                                    fieldtype: 'Small Text'
                                },
                                {
                                    label: 'Quantity is unlimided',
                                    fieldname: 'is_unlimited',
                                    fieldtype: 'Check'
                                },
                                {
                                    label: 'Quantity',
                                    fieldname: 'quantity',
                                    fieldtype: 'Int',
                                    depends_on: "eval:doc.is_unlimited==0",
                                    mandatory_depends_on: "eval:doc.is_unlimited==0"
                                },
                                {
                                    label: 'Units',
                                    fieldname: 'units',
                                    fieldtype: 'Select',
                                    options: "Units",
                                    depends_on: "eval:doc.is_unlimited==0",
                                    mandatory_depends_on: "eval:doc.is_unlimited==0"
                                }
                            ]
                            ,
                            size: 'small',
                            primary_action_label: 'Submit',
                            primary_action(values) {
                                frappe.call({
                                    method: "vicinu.api.create_offer",
                                    args: {
                                        user: frm.doc.user,
                                        product: values.product,
                                        is_accessible: values.is_accessible,
                                        is_donation_required: values.is_donation_required,
                                        description: values.description ? values.description : "",
                                        is_unlimited: values.is_unlimited,
                                        quantity: values.quantity ? values.quantity : 0,
                                        units: values.units ? values.units : "Units",
                                    },
                                });
                                d.hide();
                            }
                        });
                        d.show();
                    }
                },
            })
		});
	},
});
