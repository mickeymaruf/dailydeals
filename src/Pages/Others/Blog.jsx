import React from 'react';
import Heading from '../../components/Heading';

const Blog = () => {
    return (
        <div className='py-5 lg:my-10 max-w-screen-lg bg-white mx-auto lg:border'>
            <Heading>Blog</Heading>
            <div className='pb-10 px-16 grid gap-10'>
                <div>
                    <h4 className='text-lg font-bold mb-2 bg-green-50 p-3'>1. What are the different ways to manage a state in a React application?</h4>
                    <p>
                        3 Ways To Manage State Better in React <br /><br />
                        <strong>Custom Hooks</strong> When using React hooks, you can sometimes end up with incredibly complex stateful logic within a single component that uses multiple types of hooks to achieve a single purpose.
                        <br /><br />
                        Global State Management In most cases, you don't need a government library. Only in larger applications that deal with complex states should you implement an <strong>external library</strong> to manage them.
                        <br /><br />
                        <strong>Use useReducer</strong> for Complex State Sometimes the useState hook won't cut it, especially when you're dealing with complex stateful behavior that can involve large objects. The useReducer hook is a powerful React hook for solving complex state management that doesn't require third-party dependencies.
                    </p>
                </div>
                <div>
                    <h4 className='text-lg font-bold mb-2 bg-green-50 p-3'>2. How does prototypical inheritance work?</h4>
                    <p>
                        The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the <code>[[Prototype]]</code> of an object, we use <code>Object.getPrototypeOf and Object</code>.
                    </p>
                </div>
                <div>
                    <h4 className='text-lg font-bold mb-2 bg-green-50 p-3'>3. What is a unit test? Why should we write unit tests?</h4>
                    <p>
                        The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                    </p>
                </div>
                <div>
                    <h4 className='text-lg font-bold mb-2 bg-green-50 p-3'>4. React vs. Angular vs. Vue?</h4>
                    <p>
                        <strong>React</strong> is a UI library, <strong>Angular</strong> is a fully-fledged front-end framework, while <strong>Vue.js</strong> is a progressive framework.
                        <br /><br />

                        According to Angular’s site, <strong>Angular</strong> applications are modular and have their own modularity system called NgModules.
                        <br /><br />

                        <strong>React</strong> doesn’t propose a specific structure to be followed, and with only a few lines of code you can have a simple React application.
                        <br /><br />

                        The structure in <strong>Vue.js</strong> is pretty simple. All pieces are meant to be self-contained, reusable components.<br /><br />

                        If we talk about learning curve, for all of them, we have to learn something new. For instance, in the case of Angular and Vue.js, we have to familiarize ourselves with the HTML-like syntax while in <strong>React</strong> you have to learn about <strong>JSX</strong>.
                        <br />
                        In <strong>Vue.js</strong> you have to work with <strong>SFC</strong>.
                        <br />
                        The hardest framework to learn is <strong>Angular</strong>. To develop properly with this framework, apart from having a good understanding of <strong>TypeScript</strong>, you need to have in mind that Angular projects have a strong structure. This helps you to keep the project more maintainable when it scales up, but at the beginning, it can be a bit hard.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Blog;