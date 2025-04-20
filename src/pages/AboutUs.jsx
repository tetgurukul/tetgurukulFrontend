// About us page

import React from 'react';
import NavBar from '../components/NavBar';
import { Container } from 'react-bootstrap';


export default function AboutUs() {
    return (
        <>
            <Container fluid className="about-container">
                <nav>
                    <NavBar />
                    <br />
                </nav>
                <div className="about-content">
                    <h1 className="about-title">About Us</h1>
                    <hr className="about-divider" />
                    <p className="about-text">
                        Welcome to Tet-Gurukul, your trusted online learning platform dedicated to providing high-quality educational resources for students, teachers, and lifelong learners.
                    </p>

                    <h1 className="about-title">Our Mission</h1>
                    <hr className="about-divider" />
                    <p className="about-text">
                        Our mission is to make education accessible, engaging, and effective for learners of all ages. We believe that knowledge has the power to transform lives, and we are committed to delivering well-structured courses, interactive learning materials, and expert guidance to help our users succeed.
                    </p>

                    <h1 className="about-title">What We Offer</h1>
                    <hr className="about-divider" />
                    <p className="about-text">
                        <strong>Comprehensive Courses</strong> – Covering a wide range of subjects, from math and science to arts and humanities.<br />
                        <strong>Expert Instructors</strong> – Learn from experienced educators and industry professionals.<br />
                        <strong>Interactive Learning</strong> – Engaging quizzes, videos, and assignments to enhance understanding.<br />
                        <strong>Flexible Learning</strong> – Study at your own pace, anytime and anywhere.
                    </p>

                    <h1 className="about-title">Our Vision</h1>
                    <hr className="about-divider" />
                    <p className="about-text">
                        We aim to create an inclusive educational space where anyone can learn and grow, regardless of their background. Through innovative technology and well-researched content, we strive to make learning an enjoyable and rewarding experience.
                    </p>

                    <hr className="about-divider" />
                    <h5 className="about-join">Join us in our journey to make education more accessible and meaningful!</h5>
                </div>
            </Container>
        </>
    );
}
