import React from 'react';

const Blogs = () => {
    return (
        <div className='my-12 mx-4'>
            <h1 className='text-4xl font-bold my-10'>Blogs Section</h1>
            <div>
                <div>
                    <h1 className='text-2xl my-5 font-bold'>Q-1.What are the different ways to manage a state in a React application?</h1>
                    <h2 className='text-xl'><span className='font-bold'>ANS..</span> 1.URL <br /> 2.Web Storage <br />3.Local State <br />4.Lifted State <br />5.Derived State </h2>
                </div>
                <div>
                    <h1 className='text-2xl my-5 font-bold'>Q-2.How does prototypical inheritance work?</h1>
                    <h2 className='text-xl'><span className='font-bold'>ANS..</span>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.

                    </h2>
                </div>
                <div>
                    <h1 className='text-2xl my-5 font-bold'>Q-3.What is a unit test? Why should we write unit tests?</h1>
                    <h2 className='text-xl'><span className='font-bold'>ANS..</span>Unit testing involves the testing of each unit or an individual component of the software application. It is the first level of functional testing. <br /><br />They enable you to catch bugs early in the development process. Automated unit tests help a great deal with regression testing. They detect code smells in your codebase. For example, if you're having a hard time writing unit tests for a piece of code, it might be a sign that your function is too complex.
                    </h2>
                </div>
                <div>
                    <h1 className='text-2xl my-5 font-bold'>Q-4.H React vs. Angular vs. Vue?</h1>
                    <h2 className='text-xl'><span className='font-bold'>ANS..</span>Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.</h2>
                </div>

            </div>
        </div>
    );
};

export default Blogs;