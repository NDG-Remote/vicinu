// Copyright (c) 2024, Andrea N. Glaus aka NDG-Remote and contributors
// For license information, please see license.txt

frappe.ui.form.on("Giver Profile", {
	refresh(frm) {
        if (frm.doc.user === frappe.session.user) {
            frm.add_custom_button(__("Create offer"), function () {
                let d = new frappe.ui.Dialog({
                    title: __('What Product do you want to offer?'),
                    fields: [
                        {
                            label: __('Product'),
                            fieldname: 'product',
                            fieldtype: 'Link',
                            options: 'Product',
                            reqd: 1
                        },
                        {
                            label: __('Accessible'),
                            fieldname: 'is_accessible',
                            fieldtype: 'Check'
                        },
                        {
                            label: __('Donation required'),
                            fieldname: 'is_donation_required',
                            fieldtype: 'Check'
                        },
                        {
                            label: __('Description'),
                            fieldname: 'description',
                            fieldtype: 'Small Text'
                        },
                        {
                            label: __('Quantity is unlimided'),
                            fieldname: 'is_unlimited',
                            fieldtype: 'Check'
                        },
                        {
                            label: __('Quantity'),
                            fieldname: 'quantity',
                            fieldtype: 'Int',
                            depends_on: "eval:doc.is_unlimited==0",
                            mandatory_depends_on: "eval:doc.is_unlimited==0"
                        },
                        {
                            label: __('Units'),
                            fieldname: 'units',
                            fieldtype: 'Select',
                            options: "Units",
                            depends_on: "eval:doc.is_unlimited==0",
                            mandatory_depends_on: "eval:doc.is_unlimited==0"
                        }
                    ]
                    ,
                    size: 'small',
                    primary_action_label: __('Submit'),
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
            });
        }
	},
});