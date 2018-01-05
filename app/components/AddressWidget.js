import React from 'react';
import { getProdResp } from '../actions/index';
import { connect } from 'react-redux';
import Loader from 'react-loader';

class AddressWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterData: '',
            loaded: true
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.prodResp.result) {
            this.setState({filterData: nextProps.prodResp, loaded: true});
        }else if(nextProps.prodResp.message) {
            this.setState({loaded: true});
        }
    }
    getProdRespse() {
        this.setState({loaded: false});
        this.props.getProdResp(this.refs.address.value, this.refs.apt.value, this.refs.zipcode.value);
    }
    render() {
        return ( <div>
            <b>Address</b><input type="text" ref="address"/>
            <b>Apt</b><input type="text" ref="apt"/>
            <b>Zip code</b><input type="text" ref="zipcode"/>
            <button onClick={(e)=>this.getProdRespse(e)}>SUBMIT</button>
            <div><Loader loaded={this.state.loaded}>
                        {
                            this.state.filterData ?

                                    <div>
                                        Products:
                                        <ul>
                                            {
                                                this.state.filterData.result.response.providerResults.map(function(providerDta) {
                                                    return  providerDta.productInfo ? providerDta.productInfo.map(function(productInfos, dta) {
                                                        return (<li key={dta}>
                                                                    <div>
                                                                        <h4>{productInfos.product.name}</h4>
                                                                        <span>{productInfos.product.externalId}</span>
                                                                    </div>
                                                                </li>);
                                                    }
                                                        ) : ' ';
                                                }
                                                )
                                            }
                                        </ul>
                                    </div>

                                : <div>{this.state.message}</div> }
            </Loader>
            </div>
        </div> );
    }
}

const mapStateToProps = (state) => {
    return {
        prodResp: state.filter.prodResp
    };
};

AddressWidget.propTypes = {
    getProdResp: React.PropTypes.func
};

export default connect(mapStateToProps, {getProdResp})(AddressWidget);
