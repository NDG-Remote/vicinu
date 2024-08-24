// Copyright (c) 2024, Andrea N. Glaus aka NDG-Remote and contributors
// For license information, please see license.txt

frappe.ui.form.on("Giver Profile", {
	refresh(frm) {
		frm.add_custom_button(__("Add this Giver to my Favorites List"), function () {
			frappe.call({
				method: "vicinu.api.add_giver_to_fav_list",
				args: {
					giver_profile_username: frm.doc.user_name,
				},
			});
		});
	},
});
