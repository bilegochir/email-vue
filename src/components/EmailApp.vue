<template>
  <div class="container">
      <div class="py-5 text-center">
        <p class="lead">HIREME</p>
      </div>
      <div class="col rounded box-shadow bg-white">
        <div class="mb-3">
          <label for="email">To</label>
          <div class="input-group">
            <input type="email" class="form-control" id="email" v-model="mail" required />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" @click="changeCC" type="button">Cc</button>
              <button class="btn btn-outline-secondary" @click="changeBCC" type="button">Bcc</button>
            </div>
          </div>
        </div>
        <div class="mb-3" v-if="showCC">
          <label for="cc">Cc</label>
          <input type="email" class="form-control" id="emailcc" v-model="emailcc">
        </div>
        <div class="mb-3" v-if="showBCC">
          <label for="bcc">Bcc</label>
          <input type="email" class="form-control" id="emailbcc" v-model="emailbcc">
        </div>
        <div class="mb-3">
          <label for="subject">Subject</label>
          <input type="text" class="form-control" id="subject" v-model="subject">
        </div>
        <div class="mb-3">
          <textarea name="emailContent" class="form-control" id="emailContent" rows="10" v-model="emailContent"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-success btn-block" @click="send">SEND</button>
        </div>
      </div>
      
  </div>
</template>

<script>

import axios from 'axios'
import { checkEmail } from '../validator/EmailValidation'

export default {
  name: 'EmailApp',
  data () {
    return {
      mail: '',
      subject: '',
      emailcc: '',
      emailbcc: '',
      emailContent: '',
      showCC: false,
      showBCC: false,
      wrongEmails: []
    }
  },
  methods: {
    async send() {
      var self = this
      
      this.wrongEmails = await checkEmail(this.mail)
      this.wrongBcc = await checkEmail(this.emailbcc)
      this.wrongCc = await checkEmail(this.emailcc)

      if (this.wrongEmails.length == 0 && this.wrongBcc.length == 0 && this.wrongCc.length == 0) {

        axios.get('http://localhost:3000/submit', 
        {
          params: {
            mail: this.mail.replace(/\s+/g, ','),
            subject: this.subject,
            emailcc: this.emailcc.replace(/\s+/g, ','),
            emailbcc: this.emailbcc.replace(/\s+/g, ','),
            emailContent: this.emailContent
          }
        }).then(function (res) {
          self.clear()
          self.showMessage('center', 'success', res.data, false, 1600)
        }).catch(function (error) {
          self.showMessage('center', 'error', 'Email services are unavailable. Please try again later.', false, 3000)
        });
      } else {
        var list = this.wrongEmails.concat(this.wrongBcc).concat(this.wrongCc)
        var addressList = ''
        list.forEach(element => {
          addressList += addressList + ' ' + element
        });
        self.showMessage('center', 'error', 'Please make sure that all addresses are properly formed: ' 
          + addressList, false, 3000)
      }
    },
    clear() {
      this.mail = ''
      this.subject = ''
      this.emailcc = ''
      this.emailbcc = ''
      this.emailContent = ''
    },
    changeCC() {
      if (!this.showCC)
        this.showCC = true
      else
        this.showCC = false
    },
    changeBCC() {
      if (!this.showBCC)
        this.showBCC = true
      else
        this.showBCC = false
    },
    showMessage(pos, tp, txt, con, ti) {
      swal({
        position: pos,
        type: tp,
        text: txt,
        showConfirmButton: con,
        timer: ti
      })
    }
  }
}
</script>

<style scoped>

.container {
  max-width: 860px;
  font-size: 14px;
}

.box-shadow {
  padding: 20px;
  box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05);
}

</style>
