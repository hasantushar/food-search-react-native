import React from "react";
import { connect } from "react-redux";
import { getGARecords } from '../../redux/newsFeed/actions'
import { v4 as uuidv4 } from 'uuid';
import { Block, Text, theme } from "galio-framework";
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

class GoogleAnalyticList extends React.Component {
        state = {
            isloading: true,
        };

        getGARecordList =()=>{
            this.props.getGARecords(1);
        }

    componentDidMount =()=>{       
        this.getGARecordList();
    }

    render() {
        let json = null;

        if (this.props.recordGAList != null && this.props.recordGAList.gaRecords != null)
        {
            this.props.recordGAList.gaRecords.map((record) => {
                record.key = uuidv4();
                record.id = uuidv4();
                if (record.record_type == 215)
                {
                    json = JSON.parse(record.json_meta_data);
                    json.BaseUrl = json.BaseUrl == null ? "" : json.BaseUrl;
                    try{
                                    console.log(json.BaseUrl);
                                    console.log(this.props.gatext);
                                    const tracker = new GoogleAnalyticsTracker(json.BaseUrl);
                                    tracker.trackScreenView(this.props.gatext);
                                    tracker.trackEvent("eventScreen",this.props.gatext);
                                }
                                catch(e){
                                    alert(e);
                                }
                }
            })
        }

        return (
            <Text>
                
            </Text> 
        )};
};

const mapStateToProps = ({newsFeed}) => {
  const { recordGAList } = newsFeed;
  return {recordGAList };
};

const mapActionToProps = { getGARecords }

export default connect(
  mapStateToProps,
  mapActionToProps
)(GoogleAnalyticList);

