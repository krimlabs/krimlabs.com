type Props = {
  condition: boolean;
  children: ReactNode;
};

function When(props: Props) {
  if (props.condition) return <>{props.children}</>;
  else return null;
}

export default When;
