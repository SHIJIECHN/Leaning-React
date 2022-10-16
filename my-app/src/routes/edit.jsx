import {
  Form,
  useLoaderData,
  redirect,
  useNavigate
} from "react-router-dom"
import { updateContact } from "../contacts.js";

export async function action({ request, params }) {
  // 创建FormData实例对象
  const formData = await request.formData();
  // {first: 'Judy', last: 'Smith', twitter: '@jack', avatar: '', notes: '11'}
  const updates = Object.fromEntries(formData);
  // 更新当前 contactId 的数据
  await updateContact(params.contactId, updates);
  // 重定向到contacts/:contactId页面
  return redirect(`/contacts/${params.contactId}`)

}

export default function EditContact() {
  const contact = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          name="first"
          type="text"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultChecked={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="http://example.com/avatar.jpg"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        ></textarea>
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1)
          }}
        >Cancel</button>
      </p>
    </Form>
  )
}