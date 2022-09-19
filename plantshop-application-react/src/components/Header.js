import Button from "./Button"

const Header = (props) => {
  const onClick = (e) => {
    console.log('click')
  }

  return (
    <header>
        <h1>{props.title}</h1>
        <Button color='green' text='Add' onClick={onClick}/>
        
    </header>
  )
}

Header.defaultProps = {
    title: 'PlantShop',
}

export default Header

