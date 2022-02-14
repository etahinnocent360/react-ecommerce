import React, {useState, createContext} from 'react';
export const UserContext = createContext()
export const UserProvider=(props) => {
	const [users, setUsers] = useState([
		{
      name: "Etah Njenwei Innocent",
      email: "etahinno360@gmail.com",
      number: 654751836,
      profile:
        "https://vinusimages.co/wp-content/uploads/2018/10/EG7A2390.jpgA_.jpg",
      id: 1,
    },
    {
      name: "Etah Njenwei Innocent",
      email: "etahinno360@gmail.com",
      number: 654751836,
      profile:
        "https://vinusimages.co/wp-content/uploads/2018/10/EG7A2390.jpgA_.jpg",
      id: 2,
    },
    {
     name: "Etah Njenwei Innocent",
      email: "etahinno360@gmail.com",
      number: 654751836,
      profile:
        "https://vinusimages.co/wp-content/uploads/2018/10/EG7A2390.jpgA_.jpg",
      id: 3,
    },
    {
      name: "Etah Njenwei Innocent",
      email: "etahinno360@gmail.com",
      number: 654751836,
      profile:
        "https://vinusimages.co/wp-content/uploads/2018/10/EG7A2390.jpgA_.jpg",
      id: 4,
    },
    {
      name: "Etah Njenwei Innocent",
      email: "etahinno360@gmail.com",
      number: 654751836,
      profile:
        "https://vinusimages.co/wp-content/uploads/2018/10/EG7A2390.jpgA_.jpg",
      id: 5,
    },
    {
      name: "Etah Njenwei Innocent",
      email: "etahinno360@gmail.com",
      number: 654751836,
      profile:
        "https://vinusimages.co/wp-content/uploads/2018/10/EG7A2390.jpgA_.jpg",
      id: 6,
    },
    {
      name: "Etah Njenwei Innocent",
      email: "etahinno360@gmail.com",
      number: 654751836,
      profile:
        "https://vinusimages.co/wp-content/uploads/2018/10/EG7A2390.jpgA_.jpg",
      id: 2,
    },
    {
     name: "Etah Njenwei Innocent",
      email: "etahinno360@gmail.com",
      number: 654751836,
      profile:
        "https://vinusimages.co/wp-content/uploads/2018/10/EG7A2390.jpgA_.jpg",
      id: 3,
    },
    {
      name: "Etah Njenwei Innocent",
      email: "etahinno360@gmail.com",
      number: 654751836,
      profile:
        "https://vinusimages.co/wp-content/uploads/2018/10/EG7A2390.jpgA_.jpg",
      id: 4,
    },
    {
      name: "Etah Njenwei Innocent",
      email: "etahinno360@gmail.com",
      number: 654751836,
      profile:
        "https://vinusimages.co/wp-content/uploads/2018/10/EG7A2390.jpgA_.jpg",
      id: 5,
    },
    {
      name: "Etah Njenwei Innocent",
      email: "etahinno360@gmail.com",
      number: 654751836,
      profile:
        "https://vinusimages.co/wp-content/uploads/2018/10/EG7A2390.jpgA_.jpg",
      id: 6,
    },
      {
      name: "Etah Njenwei Innocent",
      email: "etahinno360@gmail.com",
      number: 654751836,
      profile:
        "http://www.goodmorningimagesdownload.com/wp-content/uploads/2019/12/Love-Images-1.jpg",
      id: 7,
    },
     {
      name: "Etah Njenwei Innocent",
      email: "etahinno360@gmail.com",
      number: 654751836,
      profile:
        "https://vinusimages.co/wp-content/uploads/2018/10/EG7A2390.jpgA_.jpg",
      id: 5,
    },
    {
      name: "Etah Njenwei Innocent",
      email: "etahinno360@gmail.com",
      number: 654751836,
      profile:
        "https://vinusimages.co/wp-content/uploads/2018/10/EG7A2390.jpgA_.jpg",
      id: 6,
    },
      {
      name: "Etah Njenwei Innocent",
      email: "etahinno360@gmail.com",
      number: 654751836,
      profile:
        "http://www.goodmorningimagesdownload.com/wp-content/uploads/2019/12/Love-Images-1.jpg",
      id: 7,
    },
	])
  return (
    <UserContext.Provider value={[users, setUsers]} >
	    {props.children}
    </UserContext.Provider>
  )
}

