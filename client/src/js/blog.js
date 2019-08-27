import React from "react";

export default class Blog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			blogs:
				[{
					id:    1,
					theme: "test",
					name:  "testnation",
					text:  "Lorem Ipsum und noch viel mehr !",
					edit:  true,
				}, {
					id:    2,
					theme: "test2",
					name:  "testnation2",
					text:  "Lorem Ipsum und noch viel mehr !2",
					edit:  true,
				}],
		};
		this.addBlog = this.addBlog.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDeleteBlog = this.handleDeleteBlog.bind(this);
	}

	addBlog() {
		const blogs = this.state.blogs;
		const newBlog = {
			id:    Math.round(Math.random() * 100000000000),
			theme: "new theme",
			name:  "new name",
			text:  "new text",
			edit:  true,
		};
		blogs.push(newBlog);
		this.setState({ blogs: blogs });
	}

	handleDeleteBlog(blogId) {
		let blogs = this.state.blogs;

		for (let c = 0; c < blogs.length; c++) {
			if (blogs[c].id === blogId) {
				blogs.splice(c, 1);
				break;
			}
		}
		this.setState({ blogs: blogs });
	}

	handleEdit(blogId, target, typo) {
		let blogs = this.state.blogs;
		const value = target.value;

		for (let i = 0; i < blogs.length; i++) {
			if (blogs[i].id == blogId) {
				blogs[i][typo] = value;
				break;
			}
		}
		this.setState({ blogs: blogs });
	}

	render() {
		const blogs = this.state.blogs;
		const headerblog = <div className="p-5 text-center"><h1>Blogs!</h1></div>;

		const blogArray =
			blogs.map(function(blog) {
				return (
					<div className="card text-dark text-center card-body m-3 col-10 ml-auto mr-auto" key={blog.id}>
						<button className="col-2 ml-auto" onClick={() => this.handleDeleteBlog(blog.id)}>Delete it !</button>
						<div className="col-12 m-3 row">
							<div className="col-2">
								Thema:
							</div>
							<input className="col-10" value={blog.theme} onChange={({ target }) => this.handleEdit(blog.id, target, "theme")} type="text"/>
						</div>
						<div className="col-12 m-3 row">
							<div className="col-2">
								Name:
							</div>
							<input className="col-10" value={blog.name} onChange={({ target }) => this.handleEdit(blog.id, target, "name")}	type="text"/>
						</div>
						<div className="m-3 blog">
							Text: <textarea rows="6" className="col-12" aria-rowcount={6} value={blog.text}
							onChange={({ target }) => this.handleEdit(blog.id, target, "text")}/>
						</div>
					</div>
				);
			}, this);

		return (
			<div className="h-100 mb-5 mt-5 background-image-blog">
				{headerblog}
				<div className="container h-75 overflow-scroll">
					{blogArray}
				</div>
				<div className="col-12 text-center btn-rounded">
					<button onClick={() => this.addBlog()} className="btn col-2 bg-dark text-white ml-auto mr-auto text-center">Add Blog</button>
				</div>
			</div>

		);
	}
}