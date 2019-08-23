import React from "react";

export default class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blog:
                [{
                theme:"test",
                name:"testnation",
                text:"Lorem Ipsum und noch viel mehr !",
            }],
        };
    }
    render() {
        const blog = this.state.blog;
        const blogHeader=
            <div className="text-center text-white">
                <h1>{blog.theme}</h1>
            </div>;
        return (
            <div className="Blogs">
                {blogHeader}
                <h5>{blog.name}</h5>
                <div className="m-3 blog">
                    {blog.text}
                </div>
            </div>
        );
    }
}