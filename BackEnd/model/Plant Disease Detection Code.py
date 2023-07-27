#!/usr/bin/env python
# coding: utf-8

# ### Import Dependencies

# In[1]:


import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


# In[2]:


import torch
from torchvision import datasets, transforms, models  # datsets  , transforms
from torch.utils.data.sampler import SubsetRandomSampler
import torch.nn as nn
import torch.nn.functional as F
from datetime import datetime


# In[3]:


get_ipython().run_line_magic('load_ext', 'nb_black')


# ### Import Dataset

# <b> Dataset Link (Plant Vliiage Dataset ):</b><br> <a href='https://data.mendeley.com/datasets/tywbtsjrjv/1'> https://data.mendeley.com/datasets/tywbtsjrjv/1 </a> 

# In[4]:


transform = transforms.Compose(
    [transforms.Resize(255), transforms.CenterCrop(224), transforms.ToTensor()]
)


# In[5]:


dataset = datasets.ImageFolder("Dataset", transform=transform)


# In[6]:


dataset


# In[7]:


indices = list(range(len(dataset)))


# In[8]:


split = int(np.floor(0.85 * len(dataset)))  # train_size


# In[9]:


validation = int(np.floor(0.70 * split))  # validation


# In[10]:


print(0, validation, split, len(dataset))


# In[11]:


print(f"length of train size :{validation}")
print(f"length of validation size :{split - validation}")
print(f"length of test size :{len(dataset)-validation}")


# In[12]:


np.random.shuffle(indices)


# ### Split into Train and Test

# In[13]:


train_indices, validation_indices, test_indices = (
    indices[:validation],
    indices[validation:split],
    indices[split:],
)


# In[14]:


train_sampler = SubsetRandomSampler(train_indices)
validation_sampler = SubsetRandomSampler(validation_indices)
test_sampler = SubsetRandomSampler(test_indices)


# In[15]:


targets_size = len(dataset.class_to_idx)


# ### Model

# <b>Convolution Aithmetic Equation : </b>(W - F + 2P) / S + 1 <br>
# W = Input Size<br>
# F = Filter Size<br>
# P = Padding Size<br>
# S = Stride <br>

# ### Transfer Learning

# In[1]:


# model = models.vgg16(pretrained=True)


# In[2]:


# for params in model.parameters():
#     params.requires_grad = False


# In[3]:


# model


# In[4]:


# n_features = model.classifier[0].in_features
# n_features


# In[5]:


# model.classifier = nn.Sequential(
#     nn.Linear(n_features, 1024),
#     nn.ReLU(),
#     nn.Dropout(0.4),
#     nn.Linear(1024, targets_size),
# )


# In[7]:


# model


# ### Original Modeling

# In[16]:


class CNN(nn.Module):
    def __init__(self, K):
        super(CNN, self).__init__()
        self.conv_layers = nn.Sequential(
            # conv1
            nn.Conv2d(in_channels=3, out_channels=32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(32),
            nn.Conv2d(in_channels=32, out_channels=32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(32),
            nn.MaxPool2d(2),
            # conv2
            nn.Conv2d(in_channels=32, out_channels=64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(64),
            nn.Conv2d(in_channels=64, out_channels=64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(64),
            nn.MaxPool2d(2),
            # conv3
            nn.Conv2d(in_channels=64, out_channels=128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(128),
            nn.Conv2d(in_channels=128, out_channels=128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(128),
            nn.MaxPool2d(2),
            # conv4
            nn.Conv2d(in_channels=128, out_channels=256, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(256),
            nn.Conv2d(in_channels=256, out_channels=256, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(256),
            nn.MaxPool2d(2),
        )

        self.dense_layers = nn.Sequential(
            nn.Dropout(0.4),
            nn.Linear(50176, 1024),
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.Linear(1024, K),
        )

    def forward(self, X):
        out = self.conv_layers(X)

        # Flatten
        out = out.view(-1, 50176)

        # Fully connected
        out = self.dense_layers(out)

        return out


# In[18]:


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(device)


# In[19]:


device = "cpu"


# In[20]:


model = CNN(targets_size)


# In[21]:


model.to(device)


# In[22]:


from torchsummary import summary

summary(model, (3, 224, 224))


# In[30]:


criterion = nn.CrossEntropyLoss()  # this include softmax + cross entropy loss
optimizer = torch.optim.Adam(model.parameters())


# ### Batch Gradient Descent

# In[31]:


def batch_gd(model, criterion, train_loader, test_laoder, epochs):
    train_losses = np.zeros(epochs)
    test_losses = np.zeros(epochs)

    for e in range(epochs):
        t0 = datetime.now()
        train_loss = []
        for inputs, targets in train_loader:
            inputs, targets = inputs.to(device), targets.to(device)

            optimizer.zero_grad()

            output = model(inputs)

            loss = criterion(output, targets)

            train_loss.append(loss.item())  # torch to numpy world

            loss.backward()
            optimizer.step()

        train_loss = np.mean(train_loss)

        validation_loss = []

        for inputs, targets in validation_loader:

            inputs, targets = inputs.to(device), targets.to(device)

            output = model(inputs)

            loss = criterion(output, targets)

            validation_loss.append(loss.item())  # torch to numpy world

        validation_loss = np.mean(validation_loss)

        train_losses[e] = train_loss
        validation_losses[e] = validation_loss

        dt = datetime.now() - t0

        print(
            f"Epoch : {e+1}/{epochs} Train_loss:{train_loss:.3f} Test_loss:{validation_loss:.3f} Duration:{dt}"
        )

    return train_losses, validation_losses


# In[32]:


device = "cpu"


# In[33]:


batch_size = 64
train_loader = torch.utils.data.DataLoader(
    dataset, batch_size=batch_size, sampler=train_sampler
)
test_loader = torch.utils.data.DataLoader(
    dataset, batch_size=batch_size, sampler=test_sampler
)
validation_loader = torch.utils.data.DataLoader(
    dataset, batch_size=batch_size, sampler=validation_sampler
)


# In[32]:


train_losses, validation_losses = batch_gd(
    model, criterion, train_loader, validation_loader, 5
)


# ### Save the Model

# In[34]:


# torch.save(model.state_dict() , 'plant_disease_model_1.pt')


# ### Load Model

# In[5]:


targets_size = 39
model = CNN(targets_size)
model.load_state_dict(torch.load("plant_disease_model_1_latest.pt"))
model.eval()


# In[ ]:


# %matplotlib notebook


# ### Plot the loss

# In[ ]:


plt.plot(train_losses , label = 'train_loss')
plt.plot(validation_losses , label = 'validation_loss')
plt.xlabel('No of Epochs')
plt.ylabel('Loss')
plt.legend()
plt.show()


# ### Accuracy

# In[35]:


def accuracy(loader):
    n_correct = 0
    n_total = 0

    for inputs, targets in loader:
        inputs, targets = inputs.to(device), targets.to(device)

        outputs = model(inputs)

        _, predictions = torch.max(outputs, 1)

        n_correct += (predictions == targets).sum().item()
        n_total += targets.shape[0]

    acc = n_correct / n_total
    return acc


# In[ ]:


train_acc = accuracy(train_loader)
test_acc = accuracy(test_loader)
validation_acc = accuracy(validation_loader)


# In[38]:


print(
    f"Train Accuracy : {train_acc}\nTest Accuracy : {test_acc}\nValidation Accuracy : {validation_acc}"
)


# ### Single Image Prediction

# In[9]:


transform_index_to_disease = dataset.class_to_idx


# In[10]:


transform_index_to_disease = dict(
    [(value, key) for key, value in transform_index_to_disease.items()]
)  # reverse the index


# In[6]:


data = pd.read_csv("disease_info.csv", encoding="cp1252")


# In[7]:


from PIL import Image
import torchvision.transforms.functional as TF


# In[8]:


def single_prediction(image_path):
    image = Image.open(image_path)
    image = image.resize((224, 224))
    input_data = TF.to_tensor(image)
    input_data = input_data.view((-1, 3, 224, 224))
    output = model(input_data)
    output = output.detach().numpy()
    index = np.argmax(output)
    print("Original : ", image_path[12:-4])
    pred_csv = data["disease_name"][index]
    print(pred_csv)


# In[53]:


single_prediction("test_images/Apple_ceder_apple_rust.JPG")


# ### Wrong Prediction

# In[10]:


single_prediction("test_images/Apple_scab.JPG")


# In[11]:


single_prediction("test_images/Grape_esca.JPG")


# In[12]:


single_prediction("test_images/apple_black_rot.JPG")


# In[13]:


single_prediction("test_images/apple_healthy.JPG")


# In[14]:


single_prediction("test_images/background_without_leaves.jpg")


# In[15]:


single_prediction("test_images/blueberry_healthy.JPG")


# In[16]:


single_prediction("test_images/cherry_healthy.JPG")


# In[17]:


single_prediction("test_images/cherry_powdery_mildew.JPG")


# In[18]:


single_prediction("test_images/corn_cercospora_leaf.JPG")


# In[19]:


single_prediction("test_images/corn_common_rust.JPG")


# In[20]:


single_prediction("test_images/corn_healthy.jpg")


# In[21]:


single_prediction("test_images/corn_northen_leaf_blight.JPG")


# In[22]:


single_prediction("test_images/grape_black_rot.JPG")


# In[23]:


single_prediction("test_images/grape_healthy.JPG")


# In[24]:


single_prediction("test_images/grape_leaf_blight.JPG")


# In[25]:


single_prediction("test_images/orange_haunglongbing.JPG")


# In[26]:


single_prediction("test_images/peach_bacterial_spot.JPG")


# In[27]:


single_prediction("test_images/peach_healthy.JPG")


# In[28]:


single_prediction("test_images/pepper_bacterial_spot.JPG")


# In[29]:


single_prediction("test_images/pepper_bell_healthy.JPG")


# In[30]:


single_prediction("test_images/potato_early_blight.JPG")


# In[31]:


single_prediction("test_images/potato_healthy.JPG")


# In[32]:


single_prediction("test_images/potato_late_blight.JPG")


# In[33]:


single_prediction("test_images/raspberry_healthy.JPG")


# In[34]:


single_prediction("test_images/soyaben healthy.JPG")


# In[35]:


single_prediction("test_images/potato_late_blight.JPG")


# In[36]:


single_prediction("test_images/squash_powdery_mildew.JPG")


# In[37]:


single_prediction("test_images/starwberry_healthy.JPG")


# In[38]:


single_prediction("test_images/starwberry_leaf_scorch.JPG")


# In[39]:


single_prediction("test_images/tomato_bacterial_spot.JPG")


# In[40]:


single_prediction("test_images/tomato_early_blight.JPG")


# In[41]:


single_prediction("test_images/tomato_healthy.JPG")


# In[42]:


single_prediction("test_images/tomato_late_blight.JPG")


# In[43]:


single_prediction("test_images/tomato_leaf_mold.JPG")


# In[44]:


single_prediction("test_images/tomato_mosaic_virus.JPG")


# In[45]:


single_prediction("test_images/tomato_septoria_leaf_spot.JPG")


# In[46]:


single_prediction("test_images/tomato_spider_mites_two_spotted_spider_mites.JPG")


# In[47]:


single_prediction("test_images/tomato_target_spot.JPG")





single_prediction("test_images/tomato_yellow_leaf_curl_virus.JPG")

