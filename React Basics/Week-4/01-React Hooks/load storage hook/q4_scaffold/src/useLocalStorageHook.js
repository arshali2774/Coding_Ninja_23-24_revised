import { useEffect, useState } from 'react';

export default function useLocalStorageHook() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(1);
  useEffect(() => {
    let name = localStorage.getItem('name');
    let age = localStorage.getItem('age');
    if (name) {
      setName(name);
    }
    if (age) {
      setAge(age);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('name', name);
    localStorage.setItem('age', age);
  }, [name, age]);
  return { name, age, setName, setAge };
}
