import axios from 'axios';

const apiUrl = '/api/play';

const eventTypes = {
  LAUNCH: 'launch',
  TERMINATE: 'terminate',
  STATUS: 'check_instance_status',
};

export default class Player {
  constructor(onReady, onLaunch) {
    this.onReady = onReady;
    this.onLaunch = onLaunch;
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

  async launchInstance() {
    try {
      const { data } = await axios.post(apiUrl, {
        event_type: eventTypes.LAUNCH,
      });
      this.instanceID = data['instance_name'];
      this.onLaunch(this.instanceID);
      this.checkStatus();
    } catch (error) {
      console.log(error.message);
    }
  }

  async terminateInstance() {
    try {
      await axios.post(apiUrl, {
        event_type: eventTypes.TERMINATE,
        instance_id: this.instanceID,
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
}
