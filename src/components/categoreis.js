import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm, reset } from 'redux-form';
import { getCategories, addCategory, removeCategory } from '../actions/index';
import _ from 'lodash';


class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisble : false,
      name : 'adasd',
      sort : 'up',
    };

    this.sortCategories = this.sortCategories.bind(this);

  }

  componentWillMount() {
    this.props.getCategories()
  }

  showForm() {
    this.setState({ formVisble : !this.state.formVisble });
  }

  onSubmit(props) {
    this.props.addCategory(props);
    this.props.dispatch(reset('newCategoryForm'));
    this.props.getCategories();
  }

  deleteCategory(category) {
    this.props.removeCategory(category);
    this.props.getCategories();
  }

  editCategory(category, index) {
    this.props.fields.name.onChange(category.name);
    this.props.fields.category.onChange(index);
    this.setState({ formVisble : true });
  }

  renderCategory() {
    let i = 0;
    return this.sort().map( (category) => {
      return (
        <tr key={i++}  >
          <td><a onClick={ this.deleteCategory.bind(this, category) } ><i className="fa fa-times" ></i></a></td>
          <td><Link to={ 'cat/'+i }>{ category.name }</Link></td>
          <td><a onClick={ this.editCategory.bind(this, category, i) } ><i className="fa fa-pencil-square-o" ></i></a></td>
        </tr>
      );
    });
  }

  sort() {
    if( this.state.sort == 'up' ) {
      return this.props.categories.sort((a, b) => {
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0;
      });
    } else {
      return this.props.categories.sort((b, a) => {
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0;
      });
    }
  }

  sortCategories(dir, e) {
    e.preventDefault();
    this.setState({sort : dir})
  }




  render() {
    const { fields : { name, category }, handleSubmit } = this.props;
    return (
      <div>
      <header className="header clearfix" >
        <div className="pull-left" ><Link  to="/" ><i className="fa fa-angle-left" ></i></Link></div>
        <div className="pull-right" ><button className="" onClick={ () => {this.showForm()} } ><i className="fa fa-plus-circle" ></i></button></div>
      </header>
        <div className="jumbotron">
          <h2 className="display-3">Categories</h2>
          <form className={this.state.formVisble ? 'show' : ''}  onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
            <div className={ `form-group ${ name.touched && name.invalid ? 'has-danger' : '' }` } >
              <input className={ `form-control ${ name.touched && name.invalid ? 'form-control-danger' : ''}` }
              placeholder="name"
              {...name} />
              <input type="hidden" name="category" {...category} />
              <div className="form-control-feedback" >{ name.touched ?  name.error : ''}</div>
            </div>
            <button className="btn" type="submit">Submit</button>
          </form>
          <table className="table">
            <thead>
              <tr>
                <th>Delete</th>
                <th>
                  Name
                  <a href="" className={ this.state.sort === 'down' ? '' : 'hidden' } onClick={ e => { this.sortCategories('up', e) }}><i className="fa fa-caret-up"></i></a>
                  <a href=""  className={ this.state.sort === 'up' ? '' : 'hidden' } onClick={e => { this.sortCategories('down', e) }}><i className="fa fa-caret-down"></i></a>
                  </th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              { this.renderCategory() }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


function validate(values) {
  const errors = {};

  if(!values.name) {
    errors.name = 'Enter a name';
  }

  return errors;
}

function mapStateToProps(state) {
  return { categories : state.categories.all }
}


export default reduxForm({
  form : 'newCategoryForm',
  fields: ['name', 'category'],
  validate
}, mapStateToProps, { addCategory, getCategories, removeCategory })(Categories);
