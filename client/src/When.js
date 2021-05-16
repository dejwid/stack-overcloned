function When(props){
  return (props.children.replace('T', ' ').substr(0, props.children.length - 5));
}
export default When;