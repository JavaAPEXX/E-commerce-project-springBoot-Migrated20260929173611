import React from 'react';

const FourOhThree = () => {
  return (
    <div>
      <h1>403 Forbidden</h1>
      <p>You do not have permission to access this page.</p>
    </div>
  );
};

export default FourOhThree;
import React from 'react';

const AdminHome = () => {
  return (
    <div>
      <h1>Admin Home</h1>
      <p>Welcome, {username}!</p>
    </div>
  );
};

export default AdminHome;
import React from 'react';

const AdminLogin = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = userService.login(username, password);
    if (user) {
      SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(user, null));
      return <Redirect to="/admin" />;
    }
    setError('Invalid username or password. Please try again.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input type="text" value={username} onChange={(event) = /> setUsername(event.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(event) = /> setPassword(event.target.value)} />
      <br />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default AdminLogin;
import React from 'react';

const CartProduct = () => {
  const products = productService.getProducts();
  return (
    <div>
      <h1>Cart Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartProduct;
import React from 'react';

const Categories = () => {
  const categories = categoryService.getCategories();
  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <h2>{category.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
import React from 'react';

const DisplayCustomers = () => {
  const customers = userService.getCustomers();
  return (
    <div>
      <h1>Customers</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <h2>{customer.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayCustomers;
import React from 'react';

const Index = () => {
  const username = SecurityContextHolder.getContext().getAuthentication().getName();
  return (
    <div>
      <h1>Index</h1>
      <p>Welcome, {username}!</p>
    </div>
  );
};

export default Index;
import React from 'react';

const Products = () => {
  const products = productService.getProducts();
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
import React from 'react';

const ProductsAdd = () => {
  return (
    <div>
      <h1>Products Add</h1>
      <form>
        <label>Product Name:</label>
        <input type="text" />
        <br />
        <label>Product Description:</label>
        <input type="text" />
        <br />
        <label>Product Price:</label>
        <input type="number" />
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductsAdd;
import React from 'react';

const ProductsUpdate = () => {
  return (
    <div>
      <h1>Products Update</h1>
      <form>
        <label>Product ID:</label>
        <input type="number" />
        <br />
        <label>Product Name:</label>
        <input type="text" />
        <br />
        <label>Product Description:</label>
        <input type="text" />
        <br />
        <label>Product Price:</label>
        <input type="number" />
        <br />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default ProductsUpdate;
import React from 'react';

const Register = () => {
  return (
    <div>
      <h1>Register</h1>
      <form>
        <label>Username:</label>
        <input type="text" />
        <br />
        <label>Password:</label>
        <input type="password" />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
import React from 'react';

const UpdateProfile = () => {
  return (
    <div>
      <h1>Update Profile</h1>
      <form>
        <label>Username:</label>
        <input type="text" />
        <br />
        <label>Password:</label>
        <input type="password" />
        <br />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
import React from 'react';

const Uproduct = () => {
  return (
    <div>
      <h1>Uproduct</h1>
      <form>
        <label>Product ID:</label>
        <input type="number" />
        <br />
        <label>Product Name:</label>
        <input type="text" />
        <br />
        <label>Product Description:</label>
        <input type="text" />
        <br />
        <label>Product Price:</label>
        <input type="number" />
        <br />
        <button type="submit">Uproduct</button>
      </form>
    </div>
  );
};

export default Uproduct;
import React from 'react';

const UserLogin = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = userService.login(username, password);
    if (user) {
      SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(user, null));
      return <Redirect to="/user" />;
    }
    setError('Invalid username or password. Please try again.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input type="text" value={username} onChange={(event) = /> setUsername(event.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(event) = /> setPassword(event.target.value)} />
      <br />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default UserLogin;
import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { AdminHome } from './adminHome';
import { Index } from './index';
import { Products } from './products';
import { ProductsAdd } from './productsAdd';
import { ProductsUpdate } from './productsUpdate';
import { Register } from './register';
import { UpdateProfile } from './updateProfile';

import { UserLogin } from './userLogin';
import { Categories } from './categories';
import { DisplayCustomers } from './displayCustomers';

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Index} />
      <Route path="/admin" component={AdminHome} />
      <Route path="/products" component={Products} />
      <Route path="/products/add" component={ProductsAdd} />
      <Route path="/products/update/:id" component={