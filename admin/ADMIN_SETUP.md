# BIGCROWN Admin Console

The admin console is part of this frontend and uses the existing Express API.

## URLs
- Admin login: `/admin/login`
- Dashboard: `/admin`
- Products: `/admin/products`
- Categories: `/admin/categories`
- Orders: `/admin/orders`
- Customers: `/admin/customers`
- Staff: `/admin/staff`

## API
Set `VITE_API_URL` in `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

The app stores the JWT returned by `/auth/login` in `localStorage` under `bigcrown_token` and also sends credentials so the httpOnly cookie can be used.

## Admin account
Use the admin account created by the backend seed script. Example:

```bash
npm run seed:admin
```

Then open:

```text
http://localhost:5173/admin/login
```

Customer accounts are rejected from the admin console even if their credentials are valid.

## Role rules
- `admin`: dashboard, products, categories, orders, customers, staff list
- `superadmin`: all admin permissions plus staff creation

The backend remains the authority for authorization; the frontend only hides/displays UI based on the authenticated role.
