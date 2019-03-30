var React = require('react');
var {connect} = require('react-redux');

var actions = require('actions');

export class TodoSearch extends React.Component{
    
    render(){
        var {dispatch, showCompleted, searchText} = this.props;
        return(
            <div className="container__header">
                <div>
                    <input type="search" ref="searchText" placeholder="Search Todos" value={searchText}
                        onChange={
                            ()=>{
                                var searchText = this.refs.searchText.value;
                                dispatch(actions.setSearchText(searchText));
                            }
                        }/>
                </div>
                <div>
                    <label>
                        <input type="checkbox" ref="showCompleted" defaultChecked={showCompleted} onChange={
                            ()=>{
                                dispatch(actions.toggleShowCompleted());
                            }
                        }/>
                        Show completed todos
                    </label>
                    
                </div>
            </div>
        );
    }
};

//Parts of the state in redux store, returned from the connect callback are set by default in props
export default connect(
    (state)=>{
        return{
            showCompleted: state.showCompleted,
            searchText: state.searchText
        };
    }
) (TodoSearch);