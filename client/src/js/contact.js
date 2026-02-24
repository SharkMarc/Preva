import React from 'react';
import PrevaIcon from '../assets/preva_icon.png';
import {SuccessBox} from './boxes';

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {
                firstname: '',
                surname: '',
                email: '',
                issue: '',
                text: '',
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleBoxes = this.handleBoxes.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleBoxes(type, message) {
        let boxId = document.getElementById(type + 'Box');

        window.setTimeout(function () {
                boxId.classList.add('box-fade-out');
            }
            , 750);
        window.setTimeout(function () {
                boxId.classList.remove('box-fade-out');
                boxId.style.display = 'none';
            }
            , 2300);
        console.log("in boxxes")
    }

    handleSuccess() {
        this.handleBoxes('success');
        console.log("in success")
        document.getElementById('successBoxItem').innerHTML = "Success! Message has been sent!";
        document.getElementById('successBox').style.display = 'block';
    }

    handleChange(e, name) {
        let contact = this.state.contact;
        const value = e.value;

        contact[name] = value;

        this.setState({contact: contact});
    }

    handleSubmit(e) {
        e.preventDefault(); // 🔥 VERY IMPORTANT

        const data = {
            contact: this.state.contact,
        };

        fetch("/contact.php", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            cache: 'no-cache'
        })
            .then(r => r.json())
            .then(response => {
                if (response.success) {
                    this.handleSuccess();
                } else {
                    alert("Mail konnte nicht gesendet werden.");
                }
            })
            .catch(err => console.error(err));
    }

    render() {
        let dnone = {display: 'none'};

        return (
            <section id="contactForm">
                <h2 className="text-center">Get in touch</h2>
                <hr/>
                <div>
                    <SuccessBox PrevaIcon={PrevaIcon} dnone={dnone}/>
                    <form role="form" onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="col-12 row">
                            <div className={'input-field col-12 col-sm-6'}>
                                <label htmlFor={'firstname'}>Firstname:</label>
                                <input type="text" id={"firstname"}
                                       onChange={({target}) => this.handleChange(target, 'firstname')} name="firstname"
                                       value={this.state.contact.firstname}
                                       placeholder="Max" required/>
                            </div>
                            <div className={'input-field col-12 col-sm-6'}>
                                <label htmlFor={'surname'}>
                                    Surname:
                                </label>

                                <input type="text" id={"surname"}
                                       onChange={({target}) => this.handleChange(target, 'surname')} name="surname"
                                       value={this.state.contact.surname}
                                       placeholder="Musterman" required/>
                            </div>
                            <div className={'input-field col-12 col-sm-6'}>
                                <label htmlFor={'email'}>
                                    E-mail:
                                </label>
                                <input type="email" id={"email"}
                                       onChange={({target}) => this.handleChange(target, 'email')} name="email"
                                       value={this.state.contact.email}
                                       placeholder="Email address" required/>
                            </div>
                            <div className={'input-field col-12 col-sm-6'}>
                                <label htmlFor={'issue'}>
                                    Subject:
                                </label>
                                <input type="text" id={"issue"}
                                       onChange={({target}) => this.handleChange(target, 'issue')} name="issue"
                                       value={this.state.contact.issue}
                                       placeholder="Subject"/>
                            </div>
                            <div className={'input-field col-12'}>
                                <label htmlFor={'issue'}>
                                    Message:
                                </label>
                                <textarea rows="6" id={"text"}
                                          onChange={({target}) => this.handleChange(target, 'text')} name="text"
                                          value={this.state.contact.text}
                                          placeholder="Please contact me."/>
                            </div>
                            <div className="col-12 mt-5 px-0 mx-auto text-center">
                                <button className="preva-btn" type="submit">Send message</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}