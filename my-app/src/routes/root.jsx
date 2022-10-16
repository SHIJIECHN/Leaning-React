import {
  Outlet,
  Link,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit
} from "react-router-dom"
import { createContact, getContacts } from '../contacts.js'
import { useEffect } from "react";

// loader
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const contacts = await getContacts();
  return { contacts, q };
}

// action
export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`)
}

export default function Root() {
  // useLoaderData 获取loader执行后的数据
  const { contacts, q } = useLoaderData();
  // 返回当前的navigation状态，三种其中的一个："idle" | "submitting" | "loading"
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching = navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  useEffect(() => {
    document.getElementById('q').value = q
  }, [q]);

  return (
    <>
      <div id='sidebar'>
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id='q'
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          {/* <form method="post">
            <button type="submit">New</button>
          </form> */}
          {/* 执行post方法，没有action属性不会跳转 */}
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        {/* <nav>
          <ul>
            <li>
              <Link to={`contacts/1`}>Your Name</Link>
            </li>
            <li>
              <Link to={`contacts/2`}>Your Friend</Link>
            </li>
          </ul>
        </nav> */}
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  {/* <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}
                    {contact.favorite && <span>★</span>}
                  </Link> */}
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? 'active'
                        : isPending
                          ? "pending"
                          : ''
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>No contacts</p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={
          navigation.state === 'loading' ? 'loading' : ''
        }
      >
        <Outlet />
      </div>
    </>
  )
}




