<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app v-model="drawer">
        <v-img src="./assets/sidebar_bg.jpg">
          <v-list>
            <v-list-item class="px-2">
              <v-list-item-avatar size="80">
                <v-img src="./assets/sekiro.jpg"></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="title">Pheasantgogogo</v-list-item-title>
                <v-list-item-subtitle>66721860@163.com</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-img>
        <v-divider></v-divider>
        <v-list>
          <v-list-item link to="/">
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item link to="archives">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Archives</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/tags">
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Tags</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/content">
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>content</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/kuangbaoshan">
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Statistics</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar app>
        <!-- -->
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Application</v-toolbar-title>
      </v-app-bar>
      <!-- Sizes your content based upon application components -->
      <v-content>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: null
    }
  }
}
</script>
