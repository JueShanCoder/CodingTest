<template>
  <div class="edit-profile">
    <div class="profile-header">
      <h2>Edit Profile</h2>
      <img class="avatar" src="@/assets/avatar.svg" alt="User Avatar" />
    </div>

    <form @submit.prevent="saveChanges">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="profile.name" />
      </div>

      <div class="form-group">
        <label for="text">Profession</label>
        <input type="text" id="profession" v-model="profile.profession" />
      </div>

      <div class="form-group">
        <label for="text">Location</label>
        <input type="text" id="location" v-model="profile.location" />
      </div>

      <div class="form-group">
        <label for="text">Phone</label>
        <input type="text" id="phone" v-model="profile.phone" />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="profile.email" />
      </div>

      <div class="form-actions">
        <button @click="saveProfile">Save changes</button>
      </div>
    </form>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

import api from '../../libs/api';

export default {
  setup() {
    const router = useRouter();

    const profile = reactive({
      name: '',
      email: '',
      phone: '',
      profession: '',
      location: '',
    });

    async function fetchProfile() {
      try {
        const { data } = await api.get('/api/user/profile');
        profile.name = data.name;
        profile.email = data.email;
        profile.phone = data.phone;
        profile.profession = data.profession;
        profile.location = data.location;
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    async function saveProfile() {
      try {
        await api.post('/api/user/profile', {
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          profession: profile.profession,
          location: profile.location,
        });
        alert('Profile saved successfully!');
        router.push('/profile');
      } catch (error) {
        console.error('Error saving profile:', error);
        alert('Failed to save profile!');
      }
    }

    onMounted(() => {
      fetchProfile();
    });

    return {
      profile,
      saveProfile,
    };
  },
};
</script>

<style scoped>
.edit-profile {
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.profile-header {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  position: relative;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
}

.edit-icon {
  position: absolute;
  top: 80px;
  right: 10px;
  font-size: 1.5em;
  cursor: pointer;
}

h2 {
  margin-top: 10px;
  font-size: 1.5em;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}

.form-actions {
  text-align: center;
  margin-top: 20px;
}

button {
  background-color: #242760;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
}

button:hover {
  background-color: #1d1f56;
}

@media (max-width: 768px) {
  .edit-profile {
    padding: 10px;
    width: 95%;
  }

  .avatar {
    width: 100px;
    height: 100px;
  }

  h2 {
    font-size: 1.2em;
  }

  input,
  select {
    font-size: 14px;
    padding: 10px;
  }

  button {
    padding: 10px 15px;
    font-size: 1rem;
  }
}
</style>
