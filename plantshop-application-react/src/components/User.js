import { FaTimes } from 'react-icons/fa'

const User = ({ user, onDelete}) => {
  return (
    <div className="user">
      <h3>
        {user.email} 
        <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(user.id)}/>
      </h3>
      <p>{user.password}</p>
    </div>
  )
}

export default User
