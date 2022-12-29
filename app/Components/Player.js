import axios from 'axios';

const apiUrl = '/api/play';

const eventTypes = {
  START: 'start_instance',
  STOP: 'stop_instance',
  LIST_AVAILABLE: 'list_instances',
  LIST_RESERVED: 'list_reserved_instances',
  STATUS: 'check_instance_status',
  TERMINATE: 'terminate',
};

const regions = {0: 'us-west-2'}

export default class Player {
  constructor(onStart, region) {
    this.onStart = onStart;
    this.region = regions[region]
    this.createdIframe = false
    this.instanceIP = null
    this.instanceID = null
  }

  createIframe() {
    if (!this.createdIframe) {
      console.log('creating iframe')
      const container = document.getElementById('player-container');
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', `//${this.instanceIP}`);
      iframe.setAttribute('id', 'ec2-player');
      iframe.setAttribute('allow', 'autoplay; fullscreen');

      container.appendChild(iframe);
      this.createdIframe = true
    }
  }

  async startInstance() {
    const instances = await this.getAvailableInstances()
    this.setInstanceID(instances[0])
    
    if (!this.instanceID) {
      console.log('no available instances, try again later')
      return
    }

    try {
      await axios.post(apiUrl, {
        event_type: eventTypes.START,
        region: this.region,
        instances: [this.instanceID]
      });
      this.checkStatus()
      this.onStart(this.instanceID);
    } catch (error) {
      console.log(error.message);
    }
  }

  async stopInstance() {
    try {
      await axios.post(apiUrl, {
        event_type: eventTypes.STOP,
        region: this.region,
        instances: [this.instanceID],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async checkStatus() {
    try {
      const { data } = await axios.post(apiUrl, {
        event_type: eventTypes.STATUS,
        instance_id: this.instanceID,
        region: this.region
      });

      if (!this.instanceIP) {
        this.instanceIP = data['PublicIpAddress'];
      }

      return data.ready === 'True' 
    } catch (error) {
      console.log(error);
    }
  }
  
  setInstanceID(id) {
    this.instanceID = id
  }
  
  getIP() {
    return this.instanceIP
  }

  getInstanceId() {
    return this.instanceID
  }

  async getAvailableInstances() {
    try {
      const {data} = await axios.post(apiUrl, {
        event_type: eventTypes.LIST_AVAILABLE,
        region: this.region,
      });

      return data['Instances Available']
    } catch (error) {
      console.log(error.message);
    }
  }
  
  async getReservedInstances() {
    try {
      const {data} = await axios.post(apiUrl, {
        event_type: eventTypes.LIST_RESERVED,
        region: this.region,
      });

      return data['Instances Available']
    } catch (error) {
      console.log(error.message);
    }
  }
}
