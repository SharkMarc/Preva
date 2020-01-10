import React from "react";

export default class Bloguser extends React.Component {
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
		this.handleSafe = this.handleSafe.bind(this);

	}

	componentDidMount() {

		fetch("http://localhost:6318/controller/blog.php", {
			method:  "GET",
			headers: { "Content-Type": "application/json" },
			cache:   "no-cache"
		})
			.then(r => {return r.json();})
			.then((data) => this.setState({ blogs: data.blogs }));
	}

	handleSafe() {
		const data = {
			blogs: this.state.blogs,
		};
		fetch("http://localhost:6318/controller/blog.php", {
			method:  "POST",
			headers: { "Content-Type": "application/json" },
			body:    JSON.stringify(data),
			cache:   "no-cache"
		})
			.then(r => {return r.json();})
			.then((data) => this.setState({ blogs: data.blogs }))
			.then(function(r) {
			});
//		.then(blogs => this.setState({ blogs: blogs }));
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
		this.setState({ blogs: blogs }, this.handleSafe);
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
		const allblogs = this.state.blogs;
		const headerblog = <div className="p-5 text-center"><h1>Blogs!</h1></div>;

		const blogArray =
			allblogs.map(function(blog) {
				return (
					<div className="card text-dark text-center card-body m-3 col-10 ml-auto mr-auto" key={blog.id}>
						<div className="col-12 m-3 row">
							<h1 className="col-12">{blog.name}</h1>
						</div>
						<div className="m-3 blog" dangerouslySetInnerHTML={{__html:blog.text.replace(/(?:\r\n|\r|\n)/g, '<br />')}}/>
					</div>
				);
			}, this);

		return (
			<div className="h-100 pb-5 mb-5 mt-5 background-image-blog " onChange={this.handleSafe}>
				{headerblog}
				<div className="container h-75 overflow-scroll">
					{blogArray}
				</div>
			</div>

		);
	}
}