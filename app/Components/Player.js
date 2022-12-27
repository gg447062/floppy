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
  constructor(onReady, onLaunch, region) {
    this.onReady = onReady;
    this.onLaunch = onLaunch;
    this.region = regions[region]
  }

  _createIframe() {
    const container = document.getElementById('player-container');
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', this.instanceIP);
    iframe.setAttribute('id', 'ec2-player');
    iframe.setAttribute('allow', 'autoplay; fullscreen');

    iframe.style.width = '100%';
    iframe.style.height = '100%';

    container.appendChild(iframe);
  }

  async startInstance() {
    try {
      await axios.post(apiUrl, {
        event_type: eventTypes.START,
        region: this.region,
        instances: [this.instanceID]
      });
      
      this.onLaunch(this.instanceID);
      this.checkStatus();
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

      console.log(`instance status: ${data.ready}`);

      if (data.ready === 'True') {
        this._createIframe();
        this.onReady(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  setInstanceID(instanceID) {
    this.instanceID = instanceID
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
