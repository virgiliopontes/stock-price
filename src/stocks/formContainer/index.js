import { connect } from 'react-redux';
import { textAction, submitAction, setValues, setDataChart } from '../actions';

const mapStateToProps = state => state.stocks;
const mapDispatchToProps = { textAction, submitAction, setValues,setDataChart };

export default connect(mapStateToProps, mapDispatchToProps);