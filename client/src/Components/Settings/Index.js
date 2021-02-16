import React from 'react'
import { Link } from 'react-router-dom'
function Index() {
    return (
        <React.Fragment>
            <div className="breadcrumb-side">
                <span><i className="fas fa-home"></i></span>
                <span><Link to="/apps">Home</Link></span>
                <span><i className="fas fa-chevron-right"></i></span>
                <span className="activetext">Setting</span>
            </div>

            <div className="content-container ">
                <div className="content-g-aside ">
                    <div className="heading2 pb-2">
                        Settings
                        </div>
                    <div className="setting-aside">
                        <div className="heading2-sm ">
                            Website Setting
                                </div>
                        <div className="subheading2-sm pb-4">
                            Here is your basic store setting of your website.
                                </div>

                        <div className="row pb-2">
                            <div className="col-lg-5 col-sm-12 col-md-12">
                                <div className="heading3 pb-1">
                                    Store Name
                                            </div>
                                <div className="subheading3-sm-it pb-2">
                                    Specify the name of your website.
                                            </div>
                            </div>
                            <div className="col-lg-7 col-sm-12 col-md-12" >
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input type="text" className="form-control" id="site_name" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row pb-2">
                            <div className="col-lg-5 col-sm-12 col-md-12">
                                <div className="heading3 pb-1">
                                    Site Email
                                            </div>
                                <div className="subheading3-sm-it pb-2">
                                    Specify the email address of your website
                                            </div>
                            </div>
                            <div className="col-lg-7 col-sm-12 col-md-12" >
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input type="text" className="form-control" id="site_email" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row pb-2">
                            <div className="col-lg-5 col-sm-12 col-md-12">
                                <div className="heading3 pb-1">
                                    Site Phone
                                            </div>
                                <div className="subheading3-sm-it pb-2">
                                    Specify the phone of your website.
                                            </div>
                            </div>
                            <div className="col-lg-7 col-sm-12 col-md-12" >
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input type="text" className="form-control" id="site_email" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row pb-2">
                            <div className="col-lg-5 col-sm-12 col-md-12">
                                <div className="heading3 pb-1">
                                    Site Phone 2
                                            </div>
                                <div className="subheading3-sm-it pb-2">
                                    Specify the phone of your website.
                                            </div>
                            </div>
                            <div className="col-lg-7 col-sm-12 col-md-12" >
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input type="text" className="form-control" id="site_email" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row pb-2">
                            <div className="col-lg-5 col-sm-12 col-md-12">
                                <div className="heading3 pb-1">
                                    Site Copyright
                                            </div>
                                <div className="subheading3-sm-it pb-2">
                                    Specify the copyright of your website.
                                            </div>
                            </div>
                            <div className="col-lg-7 col-sm-12 col-md-12" >
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input type="text" className="form-control" id="site_email" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row pb-2">
                            <div className="col-lg-5 col-sm-12 col-md-12">
                                <div className="heading3 pb-1">
                                    Allow Registration
                                            </div>
                                <div className="subheading3-sm-it pb-2">
                                    Enable or disable registration from site.
                                            </div>
                            </div>
                            <div className="col-lg-7 col-sm-12 col-md-12" >
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input type="text" className="form-control" id="site_email" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row pb-2">
                            <div className="col-lg-5 col-sm-12 col-md-12">
                                <div className="heading3 pb-1">
                                    Main Website
                                            </div>
                                <div className="subheading3-sm-it pb-2">
                                    Specify the main link of your website
                                            </div>
                            </div>
                            <div className="col-lg-7 col-sm-12 col-md-12" >
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input type="text" className="form-control" id="site_email" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row pb-2 flex align-center">
                            <div className="col-lg-5 col-sm-5 col-md-5">
                                <div className="heading3 pb-1">
                                    Enable Price
                                            </div>
                                <div className="subheading3-sm-it pb-2">
                                    Enable to make price of your product visible
                                            </div>
                            </div>
                            <div className="col-lg-7 col-sm-7 col-md-7 " >
                            <div className="w-auto ">
                                    <input
                                        className="checkbox-switch hidden"
                                        type="checkbox"
                                        id="setting-price"

                                    />
                                    <label className="switch-btn" htmlFor="setting-price"></label>
                                </div>
                            </div>
                        </div>
                        <div className="row pb-2 flex align-center">
                            <div className="col-lg-5 col-sm-5 col-md-5">
                                <div className="heading3 pb-1 ml-auto">
                                    Maintenance
                                            </div>
                                <div className="subheading3-sm-it pb-2">
                                    Enable to make your website offline
                                            </div>
                            </div>
                            <div className="col-lg-7 col-sm-7 col-md-7 " >
                                <div className="w-auto ">
                                    <input
                                        className="checkbox-switch hidden"
                                        type="checkbox"
                                        id="setting-maintenance"

                                    />
                                    <label className="switch-btn" htmlFor="setting-maintenance"></label>
                                </div>
                            </div>
                        </div>
                        <div className="row pb-2">
                           
                            <div className="col-lg-7 col-sm-12 col-md-12 ml-auto">
                                <button className="btn btn-primary ml-auto"  data-dismiss="modal" aria-label="Close" >Update</button>
                            </div>
                           
                        </div>
                        
                        
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default Index


