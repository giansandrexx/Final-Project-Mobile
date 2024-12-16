import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
  Modal,
  TextInput,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedView, setSelectedView] = useState("App");
  const [signedUpEvents, setSignedUpEvents] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    logo: "",
    organization: "",
    eventName: "",
    description: "",
    location: "",
    dateTime: "",
    phone: "",
    email: "",
  });

  const [name, setName] = useState("User Account");
  const [username, setUsername] = useState("@username");
  const [bio, setBio] = useState("This is User Bio");
  const [email, setEmail] = useState("user@example.com");

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (!formData.logo) {
      alert("Please provide a logo URL for the event.");
      return;
    }
    if (!formData.organization || !formData.eventName) {
      alert("Please fill in all required fields.");
      return;
    }

    setEvents([...events, formData]);
    setModalVisible(false);
    setFormData({
      logo: "",
      organization: "",
      eventName: "",
      description: "",
      location: "",
      dateTime: "",
      phone: "",
      email: "",
    });
  };

  const banners = [
    { id: "1", source: require("./img/banner1.png") },
    { id: "2", source: require("./img/banner2.png") },
    { id: "3", source: require("./img/banner3.jpg") },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderEventInfo = (logo, title, image, description, participants) => {
    return (
      <View style={styles.eventContainer}>
        <Image source={logo} style={styles.eventLogo} />
        <Text style={styles.eventTitle}>{title}</Text>
        <Image source={image} style={styles.eventImage} />
        <Text style={styles.eventDescription}>{description}</Text>
        <Text style={styles.eventParticipants}>
          {participants} Volunteers participated
        </Text>
      </View>
    );
  };

  const handleSignUp = (id, event) => {
    if (!signedUpEvents.includes(id)) {
      setSignedUpEvents((prevEvents) => [...prevEvents, id]);
      setActivities((prevActivities) => [
        ...prevActivities,
        { ...event, status: "Pending" },
      ]);
    }
  };

  const renderView = () => {
    switch (selectedView) {
      case "Home":
        return (
          <>
            <Image source={require("./img/logo.png")} style={styles.logo} />
            <View style={styles.line} />
            <View style={styles.greetingBox}>
              <Text style={styles.greetingText}>
                Welcome back! Ready to make a difference today?
              </Text>
            </View>
            <View style={styles.line} />
            <Animated.View style={styles.carouselContainer}>
              <Image
                source={banners[currentIndex].source}
                style={styles.carouselImage}
              />
            </Animated.View>

            {renderEventInfo(
              require("./img/ub.png"),
              "University of Batangas",
              require("./img/v2.jpg"),
              "The University of Batangas organized a successful tree planting event, bringing together students and volunteers to plant over 300 trees. A heartfelt thank you to everyone who participated!",
              167
            )}

            {renderEventInfo(
              require("./img/cict.jpeg"),
              "CICT Department",
              require("./img/v1.jpg"),
              "113 Volunteers helped clean up our Kalumpang River! Maraming salamat po! Panatilihin nating malinis ang ating barangay at kapaligiran.",
              113
            )}
            {renderEventInfo(
              require("./img/ubsg.jpg"),
              "UBSG CAS",
              require("./img/v4.jpg"),
              "UBSG College of Arts and Sciences recently held a successful event, bringing together volunteers, donors, and communities in need.",
              78
            )}
          </>
        );
      case "Discover":
        const renderEventInDiscover = (event, index) => {
          const isSignedUp = signedUpEvents.includes(event.id);

          return (
            <View style={styles.discoverCard} key={index}>
              <View style={styles.discoverEventLogoContainer}>
                <Image
                  source={{ uri: event.logo }}
                  style={styles.discoverEventLogo}
                />
                <Text style={styles.discoverEventOrg}>
                  {event.organization}
                </Text>
              </View>
              <Text style={styles.discoverEventTitle}>{event.eventName}</Text>
              <Text style={styles.discoverEventDescription}>
                {event.description}
              </Text>
              <View style={styles.eventDetailsContainer}>
                <View style={styles.eventDetailRow}>
                  <Icon name="map-marker" size={20} color="#01c289" />
                  <Text style={styles.eventDetailText}>{event.location}</Text>
                </View>
                <View style={styles.eventDetailRow}>
                  <Icon name="calendar" size={20} color="#01c289" />
                  <Text style={styles.eventDetailText}>{event.dateTime}</Text>
                </View>
                <View style={styles.eventDetailRow}>
                  <Icon name="envelope" size={20} color="#01c289" />
                  <Text style={styles.eventDetailText}>{event.email}</Text>
                </View>
                <View style={styles.eventDetailRow}>
                  <Icon name="phone" size={20} color="#01c289" />
                  <Text style={styles.eventDetailText}>{event.phone}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.signupButton,
                  isSignedUp && { backgroundColor: "#b0b0b0" },
                ]}
                onPress={() => !isSignedUp && handleSignUp(event.id, event)}
                disabled={isSignedUp}
              >
                <Text style={styles.signupButtonText}>
                  {isSignedUp ? "Signed Up" : "Sign Up"}
                </Text>
              </TouchableOpacity>
            </View>
          );
        };

        return (
          <View style={styles.discoverContainer}>
            <Image source={require("./img/logo.png")} style={styles.logo} />
            <View style={styles.line} />
            <Text style={styles.discoverTitle}>Discover Events</Text>
            {events.length > 0 ? (
              events.map((event, index) => renderEventInDiscover(event, index))
            ) : (
              <Text style={styles.noEventsText}>No events added yet</Text>
            )}
          </View>
        );
      case "Activity":
        const handleActivityClick = (activity) => {
          setSelectedActivity(activity);
          setIsModalVisible(true);
        };

        return (
          <View style={styles.activityContainer}>
            <Image source={require("./img/logo.png")} style={styles.logo} />
            <View style={styles.line} />
            <Text style={styles.discoverTitle}>My Activities</Text>
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.activityCard}
                  onPress={() => handleActivityClick(activity)}
                >
                  <Text style={styles.activityName}>{activity.eventName}</Text>
                  <Text style={styles.activityStatus}>
                    {`Status: ${activity.status}`}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noEventsText}>No activities added yet</Text>
            )}

            {selectedActivity && isModalVisible && (
              <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <ScrollView>
                      <View style={styles.discoverEventLogoContainer}>
                        <Image
                          source={{ uri: selectedActivity.logo }}
                          style={styles.discoverEventLogo}
                        />
                        <Text style={styles.discoverEventOrg}>
                          {selectedActivity.organization}
                        </Text>
                      </View>
                      <Text style={styles.discoverEventTitle}>
                        {selectedActivity.eventName}
                      </Text>
                      <Text style={styles.discoverEventDescription}>
                        {selectedActivity.description}
                      </Text>
                      <View style={styles.eventDetailsContainer}>
                        <View style={styles.eventDetailRow}>
                          <Icon name="map-marker" size={20} color="#01c289" />
                          <Text style={styles.eventDetailText}>
                            {selectedActivity.location}
                          </Text>
                        </View>
                        <View style={styles.eventDetailRow}>
                          <Icon name="calendar" size={20} color="#01c289" />
                          <Text style={styles.eventDetailText}>
                            {selectedActivity.dateTime}
                          </Text>
                        </View>
                        <View style={styles.eventDetailRow}>
                          <Icon name="envelope" size={20} color="#01c289" />
                          <Text style={styles.eventDetailText}>
                            {selectedActivity.email}
                          </Text>
                        </View>
                        <View style={styles.eventDetailRow}>
                          <Icon name="phone" size={20} color="#01c289" />
                          <Text style={styles.eventDetailText}>
                            {selectedActivity.phone}
                          </Text>
                        </View>
                      </View>
                      <Button
                        title="Close"
                        onPress={() => setIsModalVisible(false)}
                        color="red"
                      />
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            )}
          </View>
        );

      case "Profile":
        return (
          <View style={styles.profileContainer}>
            <Image source={require("./img/logo.png")} style={styles.logo} />
            <View style={styles.line} />
            <Text style={styles.discoverTitle}>Profile</Text>

            <View style={styles.profileImageContainer}>
              <Image
                source={require("./img/user.png")}
                style={styles.profileImage}
              />
            </View>

            {!isEditing ? (
              <>
                <Text style={styles.profileName}>{name}</Text>
                <Text style={styles.profileUsername}>{username}</Text>
                <Text style={styles.profileBio}>{bio}</Text>
                <Text style={styles.profileEmail}>{email}</Text>
              </>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  style={styles.input}
                  value={bio}
                  onChangeText={setBio}
                />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                />
              </>
            )}

            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditToggle}
            >
              <Text style={styles.buttonText}>
                {isEditing ? "Save Profile" : "Edit Profile"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        );

      case "Admin":
        const handleAcceptEvent = (eventId) => {
          setActivities((prevActivities) => {
            return prevActivities.map((activity) =>
              activity.id === eventId
                ? { ...activity, status: "Accepted" }
                : activity
            );
          });
        };

        const handleRejectEvent = (eventId) => {
          setActivities((prevActivities) => {
            return prevActivities.map((activity) =>
              activity.id === eventId
                ? { ...activity, status: "Rejected" }
                : activity
            );
          });
        };

        return (
          <View style={styles.notifContainer}>
            <Image source={require("./img/logo.png")} style={styles.logo} />
            <View style={styles.line} />
            <Text style={styles.discoverTitle}>Admin</Text>
            <TouchableOpacity
              style={styles.addEventButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.addEventButtonText}>Add Event</Text>
            </TouchableOpacity>

            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="slide"
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <ScrollView>
                    <Text style={styles.modalTitle}>Add Event</Text>
                    {formData.logo ? (
                      <Image
                        source={{ uri: formData.logo }}
                        style={{ width: 100, height: 100, marginBottom: 10 }}
                      />
                    ) : (
                      <Text style={styles.noLogoText}>No logo provided</Text>
                    )}

                    <TextInput
                      placeholder="Logo Image URL"
                      style={styles.input}
                      value={formData.logo}
                      onChangeText={(value) => handleInputChange("logo", value)}
                    />
                    <TextInput
                      placeholder="Organization Name"
                      style={styles.input}
                      value={formData.organization}
                      onChangeText={(value) =>
                        handleInputChange("organization", value)
                      }
                    />
                    <TextInput
                      placeholder="Event Name"
                      style={styles.input}
                      value={formData.eventName}
                      onChangeText={(value) =>
                        handleInputChange("eventName", value)
                      }
                    />
                    <TextInput
                      placeholder="Description"
                      style={styles.input}
                      value={formData.description}
                      onChangeText={(value) =>
                        handleInputChange("description", value)
                      }
                    />
                    <TextInput
                      placeholder="Location"
                      style={styles.input}
                      value={formData.location}
                      onChangeText={(value) =>
                        handleInputChange("location", value)
                      }
                    />
                    <TextInput
                      placeholder="Date and Time"
                      style={styles.input}
                      value={formData.dateTime}
                      onChangeText={(value) =>
                        handleInputChange("dateTime", value)
                      }
                    />
                    <TextInput
                      placeholder="Phone"
                      style={styles.input}
                      value={formData.phone}
                      onChangeText={(value) =>
                        handleInputChange("phone", value)
                      }
                    />
                    <TextInput
                      placeholder="Email"
                      style={styles.input}
                      value={formData.email}
                      onChangeText={(value) =>
                        handleInputChange("email", value)
                      }
                    />
                    <View style={styles.buttonContainer}>
                      <Button
                        title="Submit"
                        onPress={handleSubmit}
                        color="#01c289"
                      />
                      <Button
                        title="Close"
                        onPress={() => setModalVisible(false)}
                        color="red"
                      />
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
            <View style={styles.activityListContainer}>
              {activities.length > 0 ? (
                activities.map((activity, index) => (
                  <View key={index} style={styles.activityCard}>
                    <Text style={styles.activityName}>
                      {activity.eventName}
                    </Text>
                    <Text style={styles.activityStatus}>
                      {`Status: ${activity.status}`}
                    </Text>
                    <View style={styles.adminButtonsContainer}>
                      {activity.status === "Pending" && (
                        <>
                          <TouchableOpacity
                            style={styles.acceptButton}
                            onPress={() => handleAcceptEvent(activity.id)}
                          >
                            <Text style={styles.acceptButtonText}>Accept</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.rejectButton}
                            onPress={() => handleRejectEvent(activity.id)}
                          >
                            <Text style={styles.rejectButtonText}>Reject</Text>
                          </TouchableOpacity>
                        </>
                      )}
                      {activity.status !== "Pending" && (
                        <Text style={styles.statusText}>
                          {activity.status === "Accepted"
                            ? "Event Accepted"
                            : "Event Rejected"}
                        </Text>
                      )}
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noEventsText}>No events to review</Text>
              )}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>{renderView()}</ScrollView>
      <View style={styles.navContainer}>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => setSelectedView("Home")}
        >
          <Icon
            name="home"
            size={30}
            color={selectedView === "Home" ? "#01c289" : "#d3d3d3"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => setSelectedView("Discover")}
        >
          <Icon
            name="search"
            size={30}
            color={selectedView === "Discover" ? "#01c289" : "#d3d3d3"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => setSelectedView("Activity")}
        >
          <Icon
            name="clipboard"
            size={30}
            color={selectedView === "Activity" ? "#01c289" : "#d3d3d3"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => setSelectedView("Profile")}
        >
          <Icon
            name="user"
            size={30}
            color={selectedView === "Profile" ? "#01c289" : "#d3d3d3"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => setSelectedView("Admin")}
        >
          <Icon
            name="user-secret"
            size={30}
            color={selectedView === "Admin" ? "#01c289" : "#d3d3d3"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
