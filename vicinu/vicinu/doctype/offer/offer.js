// Copyright (c) 2024, Andrea N. Glaus aka NDG-Remote and contributors
// For license information, please see license.txt

frappe.ui.form.on("Offer", {
	refresh(frm) {
		frm.add_custom_button(__("Start a Chat"), function () {
			frappe.call({
				method: "vicinu.api.create_offer_chat",
				args: {
					taker_user: frappe.session.user,
                    giver_profile: frm.doc.giver_profile,
                    offer: frm.doc.name,
				},
			});
		});
	},
});
