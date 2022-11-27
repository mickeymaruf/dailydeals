import React from 'react';
import Heading from '../../components/Heading';

const Blog = () => {
    return (
        <div className='py-5 my-10 max-w-screen-lg bg-white mx-auto border'>
            <Heading>Blog</Heading>
            <div className='pb-10'>
                <div className='border-l pl-10 w-full md:w-9/12 mx-auto lg:mr-20'>
                    <div className='relative hover:bg-base-100 p-5 rounded-lg mb-5 duration-100 font-blog font-thin'>
                        <div className='w-2 h-2 bg-warning rounded-full absolute -left-[41px] -translate-x-1/2 top-1/2'></div>
                        <div className='hidden md:block absolute -left-24 -translate-x-1/2 top-1/2 -translate-y-1/2 mt-1 text-sm'>
                        </div>
                        <h4 className='text-lg font-bold mb-2 bg-green-50 p-3'>What are the different ways to manage a state in a React application?</h4>
                        <p>
                            Custom Hooks When using React hooks, you can sometimes end up with incredibly complex stateful logic within a single component that uses multiple types of hooks to achieve a single purpose.

                            Global State Management In most cases, you don't need a government library. Only in larger applications that deal with complex states should you implement an external library to manage them.

                            Use useReducer for Complex State Sometimes the useState hook won't cut it, especially when you're dealing with complex stateful behavior that can involve large objects. The useReducer hook is a powerful React hook for solving complex state management that doesn't require third-party dependencies.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;