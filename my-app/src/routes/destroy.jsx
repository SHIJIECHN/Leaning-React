import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts.js";

export async function action({ params }) {
    throw new Error('oh dang!');
    await deleteContact(params.contactId);
    return redirect('/');
}

