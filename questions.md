1. What is the difference between Component and PureComponent?
   Give an example where it might break my app.<p>**Answer:**
   `Component` is the constructor class every react class component should inherit.
   `PureComponent` extends `Component` and adds a `shouldComponentUpdate` method implementation which compares all states and props and skips an update if nothing changed.

   It might break if you consume context in the component. If the context changes, but no props do, it won't update.</p>

2. Context + ShouldComponentUpdate might be dangerous. Why is
   that?<p>**Answer:**
   Because in should component update you can't check for context changes and may accidentally skip an update when you shouldn't because context has changed.</p>
3. Describe 3 ways to pass information from a component to its
   PARENT.<p>**Answer:**
   1. Pass a callback method, which the child component can call and pass any indormation.
   2. Pass a ref and edit it in the child component.
   3. Use context, edit the context in the child coomponent, consume it in the parent.</p>
4. Give 2 ways to prevent components from re-rendering.<p>**Answer:**
   1. Use `shouldComponentUpdate`/`PureComponent` for classes, `React.memo`(optionally with a second argument) for functional components.
   2. Don't keep data, changing which shouldn't trigger re-renders in state. Keep them in `this` for class components, in a `useRef` result or outside of the component for functional components
   </p>
5. What is a fragment and why do we need it? Give an example where it might break my app.<p>**Answer:**
   A fragment is a built-in react element wrapper, which returns its children WITHOUT wrapping them in a real html element.

   We need it, because every JSX expression should have a single parent, but sometimes we need to return multiple elements from a function without wrapping them in a div or other html element, not to alter the dom.

   You can use it like `<>some jsx</>` or `<React.Fragment>some jsx</React.Fragment>`

   It might break the app if you pass it as children to a component but it explicitly expects a single jsx element and for example, tries to add a class name to that single parent element.
   </p>

6. Give 3 examples of the HOC pattern.<p>**Answer:**
   HOC pattern is for altering how a component renders. It usually takes the component, adds some props/wraps in some other elements/adds some custom logic and returns the component.

   Examples:

   1. `withAuth` - you can write a HOC that checks if the user is logged in, and if not, render some error section/login screen instead of the component.
   2. `Layout` - wrap your page components in a pre-defined page layout.
   3. `connect` - from react-redux. It is used to connect a component to the redux store by adding props that are derived from the store using `mapStateToProps` and `mapDispatchToProps`.
   </p>

7. What's the difference in handling exceptions in promises,
   callbacks and async...await?<p>**Answer:**
   `try-catch` is good at catching

   If you're making an async operation, you should use a Promise, reject it in the synchronous callback of the async operation, then use `.catch` to handle it. `try-catch` won't catch errors in async callbacks.

   However, if you `await` for your async operation, you can use `try-catch` and it will handle errors. `async-await` uses promises and generator function underneath, to emulate sync code.
   </p>

8. How many arguments does setState take and why is it async<p>**Answer:**
   `setState` takes 2 arguments. It's `async` because react might choose to delay the applying of the new state and rerendering, for optimization and other purposes. e.g. batch updates

   Arguments:

   1. New state object or a callback, which will receive the guaranteed latest state from react and return a new value, which react will then set as the new state.
   2. Callback function. it's not `async` in the sense that it returns a promise. But you can pass a callback function to be executed after react eventually sets the state.
   </p>

9. List the steps needed to migrate a Class to Function
   Component.<p>**Answer:**

   1. Take the `render` methods of your class components and make them the bodies of the functional components.
   2. Take the states of your components and write them in `useState` or `useReducer`(if too complex) hooks.
   3. Use `useEffect` to compensate for the lack of lifecycle methods. With empty dependency array you can use it similar to `componentDidMount`. By defining dependencies - `componentDidUpdate`. Keep in mind that you don't have the ability to actually compare which state or props changed like you did in lifecycle methods. If you return a method, it can replace `componentWillUnmount`.
   4. Optionally, convert conext consumer HOCs into `useContext`.
   5. Convert `createRef`s to `useRef`s.
   6. Instance methods that you were keeping in `this`, should be either defined in the function body and, optionally, optimized with `useCallback`, or taken out of the function scopes, maybe separate helper files.
   7. Instance properties that you were keeping in `this` should now either be variables, optionally optimized with `useMemo`, be outside of the function, or be moved to `useRef`s, which preserves object references across multiple renders.
   8. Use `React.memo` to replace `shouldComponentUpdate`/`PureComponent`.
   9. Make sure to replace any 3rd party libs' usage, like react-redux, etc.

   Keep in mind that almost none of the functional alternatives are exactly the same as theire class counterparts so you'll need might to change your mindset of how things work, not try to replicate what you had.
   </p>

10. List a few ways styles can be used with components<p>**Answer:**

    1. You can pass a `className` prop to a component, pass it to the root(or any other) element.
    2. You can pass inline styles to a component and give them the child elements, applying any necessary logic.
    3. You can use css modules to encapsulate components' classes with them.
    4. You can use external libraries like `styled-components` to encapsulate components' styles and be able to apply dynamic styles.
    5. You can use a theme provider, use the theme along with the other methods, to customize components.</p>

11. How to render an HTML string coming from the server.<p>**Answer:**
    You should set it as `innerHtml` to an html element. You can either use pure js, or in react, html jsx elements now have some method prop like `dangerouslySetInnerHtml`. It's dangerous because the html might contain cross-site scripting attack codes. So you need to sanitize it before setting, either manually or using a third-party lib.</p>
