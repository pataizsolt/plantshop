import User from "./User"

const Users = ({ users, onDelete }) => {
    
    return (
        <>
          {users.map((user) => (
            <User key={user.id} user={user} onDelete={onDelete}/>
        ))}
        </>
    )
}

export default Users
