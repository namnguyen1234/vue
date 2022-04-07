import axios from '../plugins/axios.js'

export default {
    async getList(page) {
      const data = await axios({
        url: `http://localhost/api/index.php?controller=api&action=getAll&page=${page}`,
      });

      return data;
    },

    async getById(id) {
      const data = await axios({
        url: `http://localhost/api/index.php?controller=api&action=getById&id=${id}`,
      });

      return data;
    },

    async insert(params = {}) {
      const data = await axios({
        url: 'http://localhost/api/index.php?controller=api&action=insert',
        method: 'POST',
        data: params
      });

      return data;
    },

    async update(id, params) {
      const data = await axios({
        url: `http://localhost/api/index.php?controller=api&action=update&id=${id}`,
        method: 'PUT',
        data: params
      });

      return data;
    },

    async destroys(id) {
      const data = await axios({
        url: `http://localhost/api/index.php?controller=api&action=destroys&id=${id}`,
        method: 'DELETE',
      });

      return data;
    },

  
}
