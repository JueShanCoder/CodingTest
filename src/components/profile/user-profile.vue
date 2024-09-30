<template>
  <div class="profile-card">
    <div class="profile-background"></div>
    <div class="profile-header">
      <img class="avatar" src="@/assets/avatar.svg" alt="User Avatar" />
      <h2 class="name">{{ profile.name }}</h2>
      <p class="profession">{{ profile.profession }}</p>
      <p class="location">
        <img src="@/assets/vector.svg" alt="Location Icon" class="location-img" />
        <i class="location-icon"></i> {{ profile.location }}
      </p>
    </div>
    <div class="contact-info">
      <h3>Contact Me</h3>
      <p class="contact-item">☎️: {{ profile.phone }}</p>
      <p class="contact-item">📮: {{ profile.email }}</p>
    </div>
    <div class="profile-actions">
      <button @click="editProfile" class="edit-btn">Edit Profile</button>
    </div>
    <div class="line-container">
      <img src="@/assets/line.svg" alt="line" class="line-img" />
    </div>
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

    // 获取用户的 Profile 信息
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

    function editProfile() {
      router.push('/edit-profile');
    }

    onMounted(() => {
      fetchProfile();
    });

    return {
      profile,
      editProfile,
    };
  },
};
</script>

<style scoped>
.profile-card {
  background-color: white;
  min-height: 100vh;
  width: 100vw;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  padding: 20px;
}

.profile-background {
  background-image: url('@/assets/rectangle.svg');
  background-repeat: no-repeat;
  background-size: cover;
  height: 35vh;
  width: 100%;
}

.profile-header {
  margin-top: -10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  width: 25vw;
  max-width: 120px;
  height: auto;
  border-radius: 50%;
  border: 4px solid white;
}

.name {
  font-size: 1.8rem;
  font-weight: bold;
  color: #242760;
  margin-bottom: 0.5rem;
}

.profession {
  font-size: 1rem;
  color: #9e9e9e;
  margin-bottom: 5px;
}

.location {
  font-size: 0.9rem;
  color: #9e9e9e;
  margin-top: 1px;
}

.location-img {
  width: 15px;
  height: 15px;
  margin-right: 5px;
  vertical-align: middle;
}

.contact-info {
  margin-top: 8vw;
  color: #242760;
  margin-left: 10vw;
  text-align: left;
  font-size: 1.1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #424242;
  margin: 10vw 0;
}

.contact-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.profile-actions {
  display: flex;
  justify-content: center; /* 水平居中按钮 */
  margin-top: 13vw;
}

.edit-btn {
  background-color: #242760;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.edit-btn:hover {
  background-color: #242760;
}

.line-container {
  display: flex;
  justify-content: center;
  margin-top: 10vw;
}

.line-img {
  width: 90%;
  max-width: 400px;
}
</style>
