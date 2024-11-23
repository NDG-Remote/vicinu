// Copyright (c) 2024, Andrea N. Glaus aka NDG-Remote and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Offer Chat", {
// 	refresh(frm) {

frappe.ui.form.on("Offer Chat", {
	refresh(frm) {
		frm.add_custom_button(__("Write a Message"), function () {
            let d = new frappe.ui.Dialog({
            title: 'Enter your message',
            fields: [
                {
                    label: 'Message',
                    fieldname: 'message',
                    fieldtype: 'Small Text'
                },
            ],
            size: 'small',
            primary_action_label: __('Submit'),
            primary_action(values) {
                frappe.call({
                    method: "vicinu.api.sent_message",
                    args: {
                        is_called_from_offer: false,
                        offer_chat: frm.doc.name,
                        taker_user: frappe.session.user,
                        giver_profile: frm.doc.giver_profile,
                        offer: frm.doc.offer,
                        message: values.message,
                    },
                });
                d.hide();
            }
        });
        d.show();
		});
	},
});
