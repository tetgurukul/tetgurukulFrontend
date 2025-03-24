//About us page

import React from 'react';
import NavBar from '../components/NavBar';
import { Container, Row, Col, Table } from 'react-bootstrap';

export default function AboutUs () {

    return (
        <>
    <Container fluid>
        <nav>
            <NavBar/>
            <br></br>
        </nav>
        <div>
            <h1 className='about-us-h1'>About Us</h1>
            <hr></hr>
            <p className='about-us-p-tag'>
            Welcome to Tet-Gurukul, your trusted online learning platform dedicated to providing high-quality educational resources for students, teachers, and lifelong learners.

            </p>
            <h1 className='about-us-h1'>Our Mission</h1>
            <hr></hr>
            <p className='about-us-p-tag'>
            Our mission is to make education accessible, engaging, and effective for learners of all ages. We believe that knowledge has the power to transform lives, and we are committed to delivering well-structured courses, interactive learning materials, and expert guidance to help our users succeed.
            </p>

            <h1 className='about-us-h1'>What We Offer</h1>
            <hr></hr>
            <p className='about-us-p-tag'>
            Comprehensive Courses – Covering a wide range of subjects, from math and science to arts and humanities.
Expert Instructors – Learn from experienced educators and industry professionals.
Interactive Learning – Engaging quizzes, videos, and assignments to enhance understanding.
Flexible Learning – Study at your own pace, anytime and anywhere.
            </p>


            <h1 className='about-us-h1'>Our Vision</h1>
            <hr></hr>
            <p className='about-us-p-tag'>
            We aim to create an inclusive educational space where anyone can learn and grow, regardless of their background. Through innovative technology and well-researched content, we strive to make learning an enjoyable and rewarding experience.
            </p>

            <hr></hr>
            <h5> Join us in our journey to make education more accessible and meaningful!</h5>
        </div>

        </Container>
        
        </>
    )
}