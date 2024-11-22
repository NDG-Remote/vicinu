// Copyright (c) 2024, Andrea N. Glaus aka NDG-Remote and contributors
// For license information, please see license.txt

frappe.ui.form.on("Taker Profile", {
	refresh(frm) {
        if (frm.doc.user === frappe.session.user) {
            frm.add_custom_button(__("Create Giver Profile"), function () {
                // console.log("User:", frm.doc.user);
                frappe.call({
                    method: "frappe.client.get_list",
                    args: {
                        doctype: "Giver Profile",
                        filters: {"user": frm.doc.user},
                    },
                    callback: function (r) {
                        if (!r.message || r.message.length === 0) {
                            // console.log(r.message);
                            // console.log("No giver profile found, showing dialog");
                            let d = new frappe.ui.Dialog({
                                title: __('Please fill out this information about you to start offering products'),
                                fields: [
                                    {
                                        label: __('First Name'),
                                        fieldname: 'first_name',
                                        fieldtype: 'Data'
                                    },
                                    {
                                        label: __('Last Name'),
                                        fieldname: 'last_name',
                                        fieldtype: 'Data'
                                    },
                                    {
                                        label: __('Bio'),
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
                            frappe.msgprint(__("You already have a giver profile"));
                        }
                    },
                })
            });
        }
	},
});
