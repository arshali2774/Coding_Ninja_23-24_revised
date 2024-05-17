import './styles.css';

export default function App() {
  return (
    <div className='App'>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          margin: 'auto',
          width: '250px',
          height: '225px',
          padding: '2rem',
        }}
      >
        <h1>Register Form</h1>
        <input
          type='text'
          placeholder='Name'
          style={{
            width: '100%',
            paddingBlock: '0.5rem',
            border: '1px solid black',
            borderRadius: '5px',
          }}
        />
        <input
          type='email'
          placeholder='Email'
          style={{
            width: '100%',
            paddingBlock: '0.5rem',
            border: '1px solid black',
            borderRadius: '5px',
          }}
        />
        <input
          type='password'
          placeholder='Password'
          style={{
            width: '100%',
            paddingBlock: '0.5rem',
            border: '1px solid black',
            borderRadius: '5px',
          }}
        />
        <button
          className='submit-btn'
          style={{
            width: '100%',
            backgroundColor: 'black',
            color: 'white',
            paddingBlock: '0.5rem',
            fontSize: '1.035rem',
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
