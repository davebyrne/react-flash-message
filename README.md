# Flash Messages in React

Sample app that uses React Hooks with React-Router v6 to create "flash" messages, which are success/failure messages to a user that are rendered after an action takes place.  These messages do not survive a refresh.

## Creating Flash Messages

The hook `useNavigateFlash` can be used to create a flash message.

```
const MyComponent = () => { 

  const navigateFlash = useNavigateFlash()

  const createFlash = (e) => { 
    e.preventDefault()

    //call api / do work before redirecting to success page
    
    navigateFlash("/some-url", {message: "This is my flash message object"})
  }
  return (
    <div>
      <button onClick={createFlash}>Create Flash message</button>
    </div>
  )
}
```

## Consuming Flash Messages

The hook `useFlash` can be used to consume flash messages.  Flash messages are deleted after being consumed.

```

const MyComponent = () => { 

  const flash = useFlash()
  return (
    <div>
      {flash && <div>Flash message is {flash.message}</div>}
    </div>
  )
}

```