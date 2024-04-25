import { Events } from "../Events.js";

import { getSession, saveSession } from "../modules/session.js";

export class ProfilePage {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    const elm = document.createElement("div");
    elm.id = "profile-page";
    elm.innerHTML = `
      <div id="banner" class="banner">
        <h1>Profile</h1>
      </div>
      <div id="user-profile">
        <div id="user-info">
          <div id="user-name-group">
            <div>
              <label for="first-name" class="textfield-label">First Name</label>
              <input type="text" id="first-name" class="textfield" name="first-name">
            </div>
            <div>
              <label for="last-name" class="textfield-label">Last Name</label>
              <input type="text" id="last-name" class="textfield" name="last-name">
            </div>
          </div>
          <div>
            <label for="major" class="textfield-label">Major/Department</label>
            <input type="text" id="major" class="textfield" name="major">
          </div>
          <div>
            <label for="role" class="textfield-label">Role</label>
            <input type="text" id="role" class="textfield" name="role">
          </div>
          <div>
            <label for="email" class="textfield-label">Email</label>
            <input type="text" id="email" class="textfield" name="email">
          </div>
        </div>
        <div id="change-password">
          <h4>Change password</h4>
          <div id="password">
            <input type="password" id="current-password" name="current-password" class="textfield" placeholder="Current password">
            <input type="password" id="new-password" name="new-password" class="textfield" placeholder="New password">
            <input type="password" id="confirm-password" name="confirm-password" class="textfield" placeholder="Confirm new password">
          </div>
        </div>
        <button id="update-profile">Update Profile</button>
      </div>
      `;

    const userData = await getSession();

    const firstNameInput = elm.querySelector("#first-name");
    const lastNameInput = elm.querySelector("#last-name");
    const majorInput = elm.querySelector("#major");
    const roleInput = elm.querySelector("#role");
    const emailInput = elm.querySelector("#email");

    
    firstNameInput.value = userData.firstName ?? "";
    lastNameInput.value = userData.lastName ?? "";
    majorInput.value = userData.major ?? "";
    roleInput.value = userData.role ?? "";
    emailInput.value = userData.email ?? "";
    emailInput.setAttribute("value", userData.email ?? "")
    console.log(roleInput)
    
    const updateProfile = elm.querySelector("#update-profile");
    updateProfile.addEventListener("click", async () => {
      const updatedUserData = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        major: majorInput.value,
        role: roleInput.value,
        email: emailInput.value,
      };

      await saveSession(updatedUserData);
    });

    return elm;
  }
}
