import Bee from 'bee-queue';
import CancelationMail from '../app/jobs/CancelationMail';
import redisConfig from '../config/redis';

const jobs = [CancelationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    // PEGA TODOS OS JOBS DA APLICAÇÃO E ARMAZENA
    // DENTRO DE QUEUES
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        // FILA COM O BANCO REDIS
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        // METODO QUE PROCESSA O JOB, RECEBE AS INFORMAÇÕES
        // E DISPARA EMAILS, ETC
        handle,
      };
    });
  }

  // 'queue' É A FILA QUE ELE VAI RECEBER O CANCELATION EMAIL
  // 'job' OS DADOS QUE VÃO SER PASSADAS
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];

      bee.process(handle);
    });
  }
}

export default new Queue();
