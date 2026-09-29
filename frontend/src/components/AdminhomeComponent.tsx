import React from 'react';

type AdminhomeComponentProps = {
    data?: Record<string, any>;
};

export const AdminhomeComponent: React.FC<AdminhomeComponentProps> = ({ data = {} }) => {

    return (
        <div className="modern-container">
            <div className="modern-card">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        		<div className="container-fluid">
        			<a className="navbar-brand" href="#"> <img src="../static/images/logo.png" width="auto" height="40" className="d-inline-block align-top" alt="" />
        			</a>
        			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        				<span className="navbar-toggler-icon"></span>
        			</button>
        
        			<div className="collapse navbar-collapse" id="navbarSupportedContent">
        				<ul className="navbar-nav mr-auto"></ul>
        				<ul className="navbar-nav">
        					<li className="nav-item active"><a className="nav-link" href="/admin/">Home
        							Page</a></li>
        					<li className="nav-item active"><a className="nav-link" href="/admin/logout">Logout</a></li>
        
        				</ul>
        
        			</div>
        		</div>
        	</nav>
        	<div className="jumbotron text-center">
        		<h1 className="display-4">Welcome Back, Admin</h1><hr>
        		<p>Manage your data from this Admin Panel</p>
        	</div><br>
        	<div className="container-fluid" >
        		<div className="row justify-content-center">
        			<div className="col-sm-3 pt-4">
        				<div className="card border border-info" style="background-color: white;">
        					<div className="card-body text-center">
        						<h4 className="card-title">Categories</h4>
        						<p>---------------------------------------------</p>
        						<p className="card-text">Manage the categories section here.</p>
        						<a href="/admin/categories" className="card-link btn btn-primary">Manage</a>
        
        					</div>
        				</div>
        			</div>
        			<div className="col-sm-3 pt-4">
        				<div className="card" style="background-color: white;">
        					<div className="card-body text-center">
        						<h4 className="card-title">Products</h4>
        						<p>---------------------------------------------</p>
        						<p className="card-text">Manage all the products here.</p>
        						<a href="/admin/products" className="card-link btn btn-primary">Manage</a>
        
        					</div>
        				</div>
        			</div>
        			<div className="col-sm-3 pt-4">
        				<div className="card" style="background-color: white;">
        					<div className="card-body text-center">
        						<h4 className="card-title">Customers</h4>
        						<p>---------------------------------------------</p>
        						<p className="card-text">Manage all the customer here.</p>
        						<a href="/admin/customers" className="card-link btn btn-primary">Manage</a>
        
        					</div>
        				</div>
        			</div>
        			
        			
        			
        		</div>
        	</div>
        
        
        
        	<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
        	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
            </div>
        </div>
    );
};

export default AdminhomeComponent;
