"use client";
import React, { useState } from "react";
import Video from "next-video";

export default function VideoGenerator() {
  const [text, setText] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const url = "https://api.creatomate.com/v1/renders";
  const apiKey = "f953962d54244b229a4b7f42cef8407065bc24155cf19a3a017025b150fa6f63f80f5af871fc743ea7f8b3c4498afff2";

  const handleGenerateVideo = async () => {
    
      const data = {
        source:{
          "output_format": "mp4",
          "width": 720,
          "height": 1280,
          "duration": 38,
          "snapshot_time": 12.31,
          "fill_color": "rgba(231,76,60,1)",
          "elements": [
            {
              "id": "0101c7a2-faff-4dfe-b001-391b4d423f5d",
              "name": "Music",
              "type": "audio",
              "track": 1,
              "time": 0,
              "duration": null,
              "source": "4191a8ff-00e9-4d0c-8683-842a478afa58",
              "trim_start": 0,
              "loop": true
            },
            {
              "id": "75a9835e-6f8b-47a3-a073-5a956f3662bc",
              "name": "Video-1",
              "type": "video",
              "track": 2,
              "time": 0,
              "duration": 9.5,
              "source": "352e0742-fe1e-4112-88e5-10ec9852278b",
              "loop": true
            },
            {
              "id": "be255ef0-a510-4cce-ad71-0408540a8a37",
              "name": "Video-2",
              "type": "video",
              "track": 2,
              "duration": 12,
              "source": "f167e11a-0c33-4255-b4e8-ea9123d1cb1b",
              "trim_start": 0,
              "loop": true
            },
            {
              "id": "bb53d489-75b7-4627-baea-3c0d27a3e890",
              "name": "Video-3",
              "type": "video",
              "track": 2,
              "duration": 12,
              "source": "e9300a04-20b2-46a6-a562-6c4e30685b6f",
              "trim_start": 0,
              "loop": true
            },
            {
              "id": "0cf1a646-4a53-4483-bea9-9ce8eff9101c",
              "name": "Intro-Text",
              "type": "text",
              "track": 3,
              "time": 0,
              "duration": 4,
              "width": "88%",
              "height": "66.7112%",
              "x_alignment": "50%",
              "y_alignment": "50%",
              "text": text,
              "font_family": "Montserrat",
              "font_weight": "600",
              "font_size_maximum": "7.5 vmin",
              "line_height": "100%",
              "fill_color": "#ffffff",
              "stroke_color": "#000000",
              "stroke_width": "1.05 vmin",
              "shadow_color": "rgba(0,0,0,0.27)",
              "dynamic": true,
              "animations": [
                {
                  "time": 0,
                  "duration": 1.5,
                  "easing": "back-out",
                  "type": "text-scale",
                  "split": "letter",
                  "track": 0,
                  "y_anchor": "200%"
                }
              ]
            },
            {
              "id": "d2e748cb-ecd9-4868-9b07-bce65ada04ef",
              "name": "Fact-1",
              "type": "text",
              "track": 3,
              "duration": 5.5,
              "y": "37.6503%",
              "width": "86.6637%",
              "height": "37.71%",
              "x_alignment": "50%",
              "text": "1. [color #f1c40f]Golden eagles[/color] are found throughout the Northern Hemisphere, from North America to Europe and Asia. 🌍",
              "font_family": "Montserrat",
              "font_weight": "600",
              "font_size_maximum": "7.5 vmin",
              "line_height": "100%",
              "fill_color": "#ffffff",
              "stroke_color": "#000000",
              "stroke_width": "1.05 vmin",
              "shadow_color": "rgba(0,0,0,0.27)",
              "dynamic": true,
              "animations": [
                {
                  "time": 0,
                  "duration": 1.5,
                  "easing": "back-out",
                  "type": "text-scale",
                  "split": "line",
                  "y_anchor": "200%"
                },
                {
                  "time": "end",
                  "duration": 1.5,
                  "easing": "back-out",
                  "reversed": true,
                  "type": "text-scale",
                  "order": "reversed",
                  "split": "line",
                  "y_anchor": "200%"
                }
              ]
            },
            {
              "id": "5b6e8466-a23a-4ef9-b094-5d01603e772d",
              "name": "Fact-2",
              "type": "text",
              "track": 3,
              "duration": 6.0239,
              "width": "86.6637%",
              "height": "37.71%",
              "x_alignment": "50%",
              "y_alignment": "50%",
              "text": text,
              "font_family": "Montserrat",
              "font_weight": "600",
              "font_size_maximum": "7.5 vmin",
              "line_height": "100%",
              "fill_color": "#ffffff",
              "stroke_color": "#000000",
              "stroke_width": "1.05 vmin",
              "shadow_color": "rgba(0,0,0,0.27)",
              "dynamic": true,
              "animations": [
                {
                  "time": 0,
                  "duration": 1.5,
                  "easing": "back-out",
                  "type": "text-scale",
                  "split": "letter",
                  "overlap": "50%",
                  "y_anchor": "200%"
                },
                {
                  "time": "end",
                  "duration": 1.5,
                  "easing": "back-out",
                  "reversed": true,
                  "type": "text-scale",
                  "order": "reversed",
                  "split": "letter",
                  "overlap": "50%",
                  "y_anchor": "200%"
                }
              ]
            },
            {
              "id": "dea44e0b-31fe-48e3-bd57-374889196326",
              "name": "Fact-3",
              "type": "text",
              "track": 3,
              "duration": 5.9761,
              "y": "37.65%",
              "width": "86.6637%",
              "height": "37.71%",
              "x_alignment": "50%",
              "text": "3. [color #f1c40f]Golden eagles[/color] have a wingspan that can reach over 7 feet and can fly at speeds of up to 200 miles per hour! 🌬️",
              "font_family": "Montserrat",
              "font_weight": "600",
              "font_size_maximum": "7.5 vmin",
              "line_height": "100%",
              "fill_color": "#ffffff",
              "stroke_color": "#000000",
              "stroke_width": "1.05 vmin",
              "shadow_color": "rgba(0,0,0,0.27)",
              "dynamic": true,
              "animations": [
                {
                  "time": 0,
                  "duration": 1.5,
                  "easing": "back-out",
                  "type": "text-scale",
                  "split": "line",
                  "y_anchor": "200%"
                },
                {
                  "time": "end",
                  "duration": 1.5,
                  "easing": "back-out",
                  "reversed": true,
                  "type": "text-scale",
                  "order": "reversed",
                  "split": "line",
                  "y_anchor": "200%"
                }
              ]
            },
            {
              "id": "61b9affe-c7f8-476b-afb5-708ef73f4cd5",
              "name": "Fact-4",
              "type": "text",
              "track": 3,
              "duration": 6,
              "y": "73.4717%",
              "width": "86.6637%",
              "height": "37.7143%",
              "x_alignment": "50%",
              "y_alignment": "100%",
              "text": "4. Unlike many other bird species, [color #f1c40f]golden eagles[/color] mate for life and will often return to the same nest site year after year. 💕",
              "font_family": "Montserrat",
              "font_weight": "600",
              "font_size_maximum": "7.5 vmin",
              "line_height": "100%",
              "fill_color": "#ffffff",
              "stroke_color": "#000000",
              "stroke_width": "1.05 vmin",
              "shadow_color": "rgba(0,0,0,0.27)",
              "dynamic": true,
              "animations": [
                {
                  "time": 0,
                  "duration": 1.5,
                  "easing": "back-out",
                  "type": "text-scale",
                  "split": "letter",
                  "y_anchor": "200%"
                },
                {
                  "time": "end",
                  "duration": 1.5,
                  "easing": "back-out",
                  "reversed": true,
                  "type": "text-scale",
                  "order": "reversed",
                  "split": "letter",
                  "y_anchor": "200%"
                }
              ]
            },
            {
              "id": "63b34e3d-98b2-494b-afd9-ef3a14a6b256",
              "name": "Fact-5",
              "type": "text",
              "track": 3,
              "duration": 6,
              "y": "62.1478%",
              "width": "86.6637%",
              "height": "37.71%",
              "x_alignment": "50%",
              "y_alignment": "100%",
              "text": "5. [color #f1c40f]Golden eagles[/color] have been important symbols in many cultures throughout history and are often associated with power, bravery, and freedom. 🌟",
              "font_family": "Montserrat",
              "font_weight": "600",
              "font_size_maximum": "7.5 vmin",
              "line_height": "100%",
              "fill_color": "#ffffff",
              "stroke_color": "#000000",
              "stroke_width": "1.05 vmin",
              "shadow_color": "rgba(0,0,0,0.27)",
              "dynamic": true,
              "animations": [
                {
                  "time": 0,
                  "duration": 1.5,
                  "easing": "back-out",
                  "type": "text-scale",
                  "split": "line",
                  "y_anchor": "200%"
                },
                {
                  "time": "end",
                  "duration": 1.5,
                  "easing": "back-out",
                  "reversed": true,
                  "type": "text-scale",
                  "order": "reversed",
                  "split": "line",
                  "y_anchor": "200%"
                }
              ]
            },
            {
              "id": "8fc9b120-dcdc-4a76-8565-9f28e5c2daf7",
              "name": "Outro-Text",
              "type": "text",
              "track": 3,
              "duration": 4.5,
              "y": "45.7541%",
              "width": "86.6637%",
              "height": "17.5803%",
              "x_alignment": "50%",
              "y_alignment": "50%",
              "text": "Follow our channel for more facts.",
              "font_family": "Montserrat",
              "font_weight": "600",
              "font_size_maximum": "7.5 vmin",
              "line_height": "100%",
              "fill_color": "#ffffff",
              "stroke_color": "#000000",
              "stroke_width": "1.05 vmin",
              "shadow_color": "rgba(0,0,0,0.27)",
              "animations": [
                {
                  "time": 0,
                  "duration": 1.5,
                  "easing": "back-out",
                  "type": "text-scale",
                  "split": "letter",
                  "track": 0,
                  "y_anchor": "200%"
                }
              ]
            },
            {
              "id": "a97e990d-e1d6-4065-9515-a15dbd26f4ee",
              "name": "Logo",
              "type": "composition",
              "track": 4,
              "time": 0,
              "y": [
                {
                  "time": 33,
                  "value": "10.2812%"
                },
                {
                  "time": 34.3,
                  "value": "60.0308%"
                }
              ],
              "width": "46.7501%",
              "height": "6.0107%",
              "aspect_ratio": 4.375,
              "opacity": [
                {
                  "time": 0,
                  "value": "0%"
                },
                {
                  "time": 0.5,
                  "value": "100%"
                },
                {
                  "time": 32.5,
                  "value": "100%"
                },
                {
                  "time": 33,
                  "value": "0%"
                },
                {
                  "time": 34.3,
                  "value": "0%"
                },
                {
                  "time": 34.8,
                  "value": "100%"
                }
              ],
              "elements": [
                {
                  "id": "c9c94e5a-6fd9-4b7b-9a75-b076838b4dfb",
                  "type": "shape",
                  "track": 1,
                  "x": "49.9894%",
                  "y": "49.9988%",
                  "width": "99.9789%",
                  "height": "100.0025%",
                  "x_anchor": "50%",
                  "y_anchor": "50%",
                  "path": "M 97.3886 19.162 L 99.7742 29.6693 C 99.8577 29.9593 99.9194 30.3517 99.9514 30.7942 C 100 33.3792 99.5525 33.5217 99.0952 33.6667 C 98.8975 33.7292 98.698 33.7917 98.5363 34.0541 C 97.7338 35.0041 97.0182 37.0091 96.4861 39.799 C 95.9534 42.5889 95.6305 46.0288 95.5602 49.6488 C 95.5088 50.0687 95.431 50.4112 95.3356 50.6412 C 95.2407 50.8687 95.1327 50.9737 95.0241 50.9387 C 94.8983 50.8912 94.7806 50.6487 94.6914 50.2587 L 93.9084 46.8113 L 93.9141 47.4688 L 93.9141 49.7438 L 93.9113 50.1637 L 93.8661 50.6337 C 93.8661 50.9537 93.8718 51.1562 93.8718 51.1562 C 93.8718 51.1562 93.8838 51.5787 93.8661 51.8762 C 93.849 52.1562 93.8473 52.4812 93.845 52.7737 L 93.8393 53.2362 L 93.8301 53.8062 L 93.8015 54.3386 L 93.7655 55.0361 L 93.7638 55.3711 L 93.7318 56.0986 L 92.515 81.473 L 92.4184 83.3729 L 92.3807 86.1403 L 91.8446 98.1225 L 91.7588 100 L 48.3674 100 L 48.1582 99.085 L 48.1205 99.8825 L 43.4772 99.8825 L 40.8932 88.5078 L 41.1396 83.3729 L 39.6815 83.3729 L 38.7751 79.363 C 37.6508 82.9429 36.2894 84.8204 34.8988 84.7104 C 33.4036 84.9679 31.9462 82.6229 30.8454 78.1905 L 29.4354 71.9757 L 29.1296 78.213 C 29.0924 79.1055 29.0439 79.948 28.9901 80.7705 L 28.9421 81.543 L 28.8615 82.6679 L 28.8347 82.9504 C 28.7552 83.9854 28.6603 84.9954 28.5506 85.9754 L 28.5026 86.4678 C 28.4214 87.1678 28.3317 87.8503 28.2345 88.5078 L 28.186 88.8828 L 28.1271 89.1653 C 27.9962 89.9878 27.8527 90.7702 27.6979 91.5102 L 27.5704 92.0402 L 27.4355 92.5652 L 27.3172 93.0577 C 27.2429 93.3277 27.1669 93.5902 27.0892 93.8402 C 27.0251 94.0476 26.96 94.2476 26.8937 94.4426 C 25.7889 97.3051 24.5143 98.6675 23.2318 98.3575 C 21.4628 98.3575 20.0471 96.1076 19.1515 92.1677 L 16.6315 81.0755 C 15.625 83.5654 14.4853 84.8454 13.3291 84.7804 C 11.8385 84.9804 10.3896 82.6054 9.2968 78.1655 L 7.8868 71.9507 L 7.4313 81.543 L 7.3398 83.4429 L 2.5948 83.4429 L 0 71.9982 L 0.1343 69.2308 L 2.9863 9.3123 L 3.0721 7.4373 L 7.8331 7.4373 L 7.9565 7.9523 L 7.9565 7.4373 L 40.0353 7.4373 L 40.1531 7.9523 L 40.1531 7.4373 L 44.7963 7.4373 L 47.3912 18.882 L 47.2626 21.6245 L 47.1231 24.6269 L 48.4582 24.6269 L 48.6674 25.5419 C 49.255 24.0344 49.922 23.2269 50.6033 23.1969 C 51.1039 23.1519 51.6006 23.5694 52.0624 24.4169 C 52.5242 25.2644 52.9403 26.5268 53.2838 28.1218 L 53.2141 27.7693 L 54.4738 33.3267 C 55.2408 27.0193 56.9618 23.1969 59.2994 23.1969 C 61.1118 23.1969 62.4469 25.2119 63.2562 28.8718 L 64.1679 32.8817 L 64.4736 26.4318 L 64.5645 24.5569 L 69.2129 24.5569 L 70.5429 30.3967 L 70.7304 26.4568 L 70.8218 24.5794 L 79.9689 24.5794 L 80.2152 25.6594 C 80.8348 24.0594 81.5441 23.2469 82.2637 23.3144 C 82.6963 23.2394 83.1273 23.5869 83.5262 24.3269 C 83.9246 25.0694 84.2807 26.1893 84.5687 27.6043 C 84.4996 27.2493 84.4464 26.9968 84.4464 26.9968 L 84.9122 29.0343 C 85.318 27.1968 85.8061 25.7419 86.3451 24.7569 C 86.8847 23.7744 87.4642 23.2819 88.0483 23.3144 C 88.3587 23.2294 88.6685 23.3444 88.9691 23.6519 L 88.4616 21.4145 C 88.3924 21.0895 88.3455 20.687 88.3267 20.252 C 88.3078 19.817 88.3175 19.367 88.3541 18.9545 C 88.3913 18.5445 88.4541 18.1845 88.5359 17.9246 C 88.6176 17.6621 88.7142 17.5046 88.8153 17.4746 L 89.2229 17.4746 C 89.3326 17.4271 89.4418 17.3571 89.5498 17.2621 C 90.1196 16.7396 90.6557 15.6671 91.1193 14.1271 C 91.5834 12.5847 91.9629 10.6122 92.2309 8.3523 L 92.2949 7.8123 C 92.4796 5.9574 92.5916 4.0924 92.6276 2.1824 C 92.6367 1.59 92.6979 1.035 92.7973 0.63 C 92.8968 0.225 93.0277 0 93.1637 0.0025 C 93.2877 0.0375 93.3666 0.15 93.4363 0.3375 C 93.5061 0.525 93.5649 0.78 93.6089 1.0825 C 93.9947 2.7224 96.1392 12.2672 96.1392 12.2672 C 96.3181 13.1072 96.3049 14.1996 96.2912 15.3021 C 96.2826 15.9871 96.2741 16.6746 96.3106 17.3096 C 96.4084 17.3871 96.5073 17.4446 96.6056 17.4846 C 96.7004 17.5221 96.7953 17.5421 96.8902 17.5446 C 97.0011 17.5546 97.1091 17.7146 97.1983 18.0045 C 97.2874 18.2945 97.3543 18.6995 97.3886 19.162 Z",
                  "fill_color": "#000000"
                },
                {
                  "id": "2504be30-7b0d-443b-9398-d3df03c3d8f3",
                  "type": "shape",
                  "track": 2,
                  "x": "45.9151%",
                  "y": "48.0062%",
                  "width": "90.5229%",
                  "height": "76.6425%",
                  "x_anchor": "50%",
                  "y_anchor": "50%",
                  "path": "M 26.3813 22.4321 L 30.124 22.4321 L 28.0276 73.807 C 27.6426 83.5372 26.9084 89.1053 25.7949 93.0554 C 24.6694 96.4315 23.3759 98.0266 22.0762 97.6449 C 19.601 97.6449 17.2263 92.2889 16.9896 79.2837 L 20.7556 79.2837 C 20.8743 82.3433 21.4191 84.0885 22.2479 84.0885 C 23.3671 84.0885 23.8822 80.6015 24.1132 75.1215 L 24.3386 69.4621 L 24.2553 69.4621 C 23.9251 71.3377 23.5243 72.848 23.0774 73.9016 C 22.6304 74.9519 22.1469 75.526 21.6558 75.5814 C 19.4767 75.5814 17.7477 66.6145 17.783 53.4886 C 17.8304 38.1903 19.7608 20.8076 23.0003 20.8076 C 23.6139 20.5956 24.2269 21.2937 24.766 22.8235 C 25.3057 24.3533 25.7488 26.6464 26.0436 29.4386 L 26.1093 29.4386 L 26.3813 22.4321 Z M 23.1361 61.2291 C 24.605 61.2291 25.4042 52.6633 25.4281 45.2882 C 25.4281 40.3627 25.0551 35.3133 23.9535 35.3133 C 22.4493 35.3133 21.6854 43.9736 21.6621 51.4075 C 21.6621 56.4276 22.0352 61.2291 23.1361 61.2291 Z M 65.1807 62.8829 C 65.1807 66.1578 64.6353 67.4724 63.9188 67.4724 C 62.7346 67.4724 62.3382 64.4127 62.3318 60.1298 L 58.6075 60.1298 C 58.5424 76.1001 61.3016 80.0502 63.7534 80.0502 C 66.8857 80.0502 68.9171 73.0404 68.9587 59.0567 C 68.9587 47.8879 67.1168 44.4923 65.3051 42.3199 C 63.9131 40.6693 63.3033 39.4755 63.309 36.7518 C 63.3153 34.0281 63.9371 32.9256 64.5469 32.9256 C 65.3107 32.9256 65.8315 34.3347 65.8852 37.9457 L 69.5035 37.9457 C 69.4619 24.6045 67.1344 20.687 64.766 20.687 C 61.8881 20.687 59.6433 27.4489 59.608 40.2388 C 59.608 50.305 60.9229 54.0105 62.9063 56.6396 C 64.1795 58.3847 65.1921 58.936 65.1807 62.8829 Z M 92.8523 30.7238 L 92.7873 30.7238 C 92.6263 27.7098 92.2703 25.0709 91.7792 23.2443 C 91.2881 21.4209 90.6909 20.5173 90.0868 20.687 C 88.4765 20.687 87.4936 24.8165 86.5638 31.0598 L 86.4988 31.0598 L 86.8422 22.4321 L 83.0755 22.4321 L 80.8194 78.1812 L 84.7578 78.1812 L 85.942 48.1032 C 86.2141 41.5533 86.8598 36.9638 87.837 36.9638 C 88.8142 36.9638 88.9442 41.0053 88.7429 45.9308 L 87.44 78.1812 L 91.3777 78.1812 L 92.5626 48.1032 C 92.8346 41.126 93.4804 36.9638 94.457 36.9638 C 95.4341 36.9638 95.5648 40.79 95.3634 45.9308 L 94.0605 78.1812 L 97.9983 78.1812 L 99.4079 45.0435 C 100 31.0598 99.0942 20.563 96.4947 20.563 C 95.7712 20.5467 95.0592 21.4698 94.4229 23.2443 C 93.7866 25.0188 93.2469 27.5891 92.8523 30.7238 Z M 0 78.1812 L 4.0684 78.1812 L 7.2127 0 L 3.1506 0 L 0 78.1812 Z M 12.2463 20.7783 C 14.9942 20.7783 17.6176 28.5514 17.576 46.1461 C 17.5406 65.3913 15.0062 79.8056 11.1328 79.8056 C 8.4683 79.8056 5.8037 72.1532 5.8511 54.6498 C 5.9161 35.8646 8.4152 20.7783 12.2463 20.7783 Z M 11.2691 66.1578 C 12.9805 66.1578 13.6142 53.1526 13.6142 45.5035 C 13.6142 40.0235 13.2885 34.6707 12.1459 34.6707 C 10.4283 34.6707 9.8419 48.4392 9.8419 55.5403 C 9.8419 61.2291 10.1499 66.1578 11.2691 66.1578 Z M 8.5693 0 L 7.9765 15.6375 L 42.1393 15.6375 L 42.7314 0 L 8.5693 0 Z M 36.0458 20.7783 C 38.793 20.7783 41.4165 28.5514 41.3755 46.1461 C 41.3395 65.3913 38.7994 79.8056 34.9266 79.8056 C 32.2615 79.8056 29.5969 72.1532 29.65 54.6498 C 29.7333 35.8646 32.2318 20.7783 36.0458 20.7783 Z M 35.0863 66.1578 C 36.7977 66.1578 37.4314 53.1526 37.4314 45.5035 C 37.4314 40.0235 37.1 34.6707 35.9568 34.6707 C 34.2455 34.6707 33.6534 48.4392 33.6534 55.5403 C 33.6534 61.2291 33.9614 66.1578 35.0863 66.1578 Z M 44.129 0 L 43.5369 15.6375 L 47.4684 15.6375 L 48.0611 0 L 44.129 0 Z M 40.9784 78.1812 L 44.9162 78.1812 L 47.1723 22.4288 L 43.2112 22.4288 L 40.9784 78.1812 Z M 53.5208 80.0502 C 52.9173 80.2786 52.2905 79.6034 51.7344 78.0931 C 51.1776 76.5861 50.7136 74.306 50.3942 71.5106 L 50.3286 71.5106 L 49.1443 99.7227 L 45.1592 99.7227 L 48.3572 22.4288 L 52.0992 22.4288 L 51.8032 29.8659 C 52.1939 27.1194 52.7002 24.8654 53.2841 23.2769 C 53.8674 21.6851 54.5131 20.8011 55.1728 20.687 C 57.5413 20.687 58.9332 31.1805 58.8915 44.8283 C 58.8385 61.9956 57.1152 80.0502 53.5208 80.0502 Z M 53.3901 36.4745 C 51.8682 36.4745 50.9327 46.544 50.9093 54.2845 C 50.9093 59.6699 51.2761 65.6685 52.526 65.6685 C 54.154 65.6685 54.8231 54.5291 54.8414 47.092 C 54.8414 42.0459 54.5567 36.4745 53.3901 36.4745 Z M 76.1595 69.3382 L 76.2245 69.4001 L 75.8811 78.2431 L 79.6231 78.2431 L 81.8799 22.4908 L 77.9478 22.4908 L 76.6922 53.6419 C 76.4378 60.0972 75.6677 63.4961 74.6968 63.4961 C 73.7253 63.4961 73.512 58.7827 73.7077 53.8572 L 74.9809 22.4908 L 71.0488 22.4908 L 69.6569 56.9169 C 69.0648 71.9085 70.415 79.9883 72.6775 79.9883 C 73.3876 79.9524 74.0839 78.9477 74.6949 77.0786 C 75.306 75.2096 75.8116 72.5381 76.1595 69.3382 Z M 97.2818 100 L 97.8739 84.3625 L 51.1757 84.3625 L 50.5836 100 L 97.2818 100 Z",
                  "fill_color": "#fff"
                },
                {
                  "id": "510e947d-3418-4c34-8845-935fadfdc612",
                  "type": "shape",
                  "track": 3,
                  "x": "92.8543%",
                  "y": "19.91%",
                  "width": "8.5554%",
                  "height": "37.385%",
                  "x_anchor": "50%",
                  "y_anchor": "50%",
                  "path": "M 46.4267 100 L 45.2511 99.6656 L 44.2827 98.9033 L 43.6882 97.8334 L 43.548 96.6096 C 44.0689 91.0258 43.4077 85.3885 41.6043 80.0789 C 39.801 74.7693 36.8955 69.8943 33.0751 65.7817 C 29.2613 61.6758 24.6193 58.4192 19.463 56.2258 C 14.3 54.0391 8.7363 52.9624 3.1325 53.0761 C 2.3043 53.0761 0.9217 52.16 0.9217 52.16 C 0.9217 52.16 0 50.769 0 49.9398 C 0 49.1106 0.9217 47.7197 0.9217 47.7197 C 0.9217 47.7197 2.3043 46.8035 3.1325 46.8035 C 4.6353 46.8972 6.1448 46.8972 7.6476 46.8035 C 18.775 45.6132 29.1411 40.5845 36.9623 32.5665 C 44.7903 24.5553 49.5725 14.0564 50.5009 2.8889 C 50.5677 2.1065 51.5028 0.8359 51.5028 0.8359 C 51.5028 0.8359 52.8453 0 53.6334 0.0067 L 54.8157 0.341 L 55.7775 1.0967 L 56.3786 2.1733 L 56.5188 3.3904 C 55.9979 8.9742 56.6591 14.6048 58.4558 19.9144 C 60.2592 25.2173 63.1579 30.0856 66.965 34.1982 C 70.7788 38.3041 75.4074 41.5608 80.557 43.7609 C 85.7133 45.9543 91.2704 47.0309 96.8675 46.9306 C 97.6957 46.9306 99.085 47.8467 99.085 47.8467 C 99.085 47.8467 100 49.231 100 50.0669 C 100 50.8961 99.085 52.2803 99.085 52.2803 C 99.085 52.2803 97.6957 53.2032 96.8675 53.2032 C 84.9653 53.3971 73.5506 57.9912 64.821 66.096 C 56.0914 74.2009 50.6546 85.2481 49.5659 97.1111 C 49.4991 97.9002 48.564 99.1708 48.564 99.1708 C 48.564 99.1708 47.2215 100 46.4267 100 Z",
                  "fill_color": "#fff"
                }
              ]
            }
          ]
        }
      }
      
    console.log("Dados enviados:", JSON.stringify(data)); // Log para verificar dados

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            console.error("Erro detalhado:", err);
            throw new Error(`HTTP error! status: ${response.status}, message: ${err.message}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Resposta da API:", data); // Log para verificar resposta
        if (data.status && data.status === "failed") {
          console.error("Erro no processamento:", data.error);
          throw new Error(`Erro no processamento: ${data.error}`);
        }
        setVideoUrl(data.url);
      })
      .catch((error) => console.error("Erro:", error));
  };

  return (
    <div className="video-generator flex flex-col items-center justify-center min-h-screen">
      <h1>Gerar Vídeo a partir de Texto</h1>

      <textarea
        rows="4"
        cols="50"
        placeholder="Insira o texto aqui..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleGenerateVideo}
      >
       
        Gerar Vídeo
      </button>
      
      {videoUrl && (
        <div>
          <h2>Seu Vídeo:</h2>
          <Video autoPlay={true} style={{ borderRadius: "10px", border: "4px solid purple" }} id="player" src={videoUrl} type="video/mp4" />
        </div>
      )}
    </div>
  );
}
