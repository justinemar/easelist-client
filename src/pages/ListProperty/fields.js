import React from "react";
import FieldFactory from "./fieldFactory";

const Fields = ({
  properties,
  handleInputChange,
  trackAddons,
  addImageData,
  removeImageData
}) => (
  <>
    <FieldFactory title="Contact">
      <FieldFactory.Input
        renderProps={{
          label: "First Name",
          func: handleInputChange,
          name: "First_name",
          type: "text",
          icon: "fa fa-user"
        }}
      />
      <FieldFactory.Input
        renderProps={{
          label: "Last Name",
          func: handleInputChange,
          name: "Last_Name",
          type: "text"
        }}
      />
    </FieldFactory>

    <FieldFactory>
      <FieldFactory.Input
        renderProps={{
          label: "Phone Number",
          func: handleInputChange,
          name: "telephone",
          type: "tel",
          staticText: "+63"
        }}
      />
    </FieldFactory>
    <FieldFactory>
      <FieldFactory.Input
        renderProps={{
          label: "Email Address",
          func: handleInputChange,
          name: "email_address",
          type: "email",
          icon: "fa fa-envelope"
        }}
      />
    </FieldFactory>
    <FieldFactory title="Property Information">
      <FieldFactory.Select
        renderProps={{
          label: "Property Type",
          func: handleInputChange,
          name: "property_type",
          type: "text",
          icon: "fa fa-building",
          options: [
            "Apartment",
            "Commercial",
            "Condo",
            "Duplex/Triplex/Fourplex",
            "Foreclosures"
          ]
        }}
      />
      <FieldFactory.Input
        renderProps={{
          label: "Property Street Address",
          func: handleInputChange,
          name: "street_address",
          type: "text",
          icon: "fa fa-road"
        }}
      />
    </FieldFactory>
    <FieldFactory>
      <FieldFactory.Input
        renderProps={{
          label: "City",
          func: handleInputChange,
          name: "city",
          type: "text",
          icon: "fa fa-map"
        }}
      />
      <FieldFactory.Input
        renderProps={{
          label: "Province",
          func: handleInputChange,
          name: "province",
          type: "text",
          icon: "fa fa-map"
        }}
      />
      <FieldFactory.Input
        renderProps={{
          label: "Zip Code",
          func: handleInputChange,
          name: "zip_code",
          type: "number",
          staticText: "ZIP"
        }}
      />
    </FieldFactory>
    <FieldFactory>
      <FieldFactory.DynamicInput
        renderProps={{
          label:
            "Add a location tag (This will make your listing more searchable)",
          onChange: handleInputChange,
          onClick: trackAddons,
          name: "extra_loc",
          type: "text",
          icon: "fa fa-search-location",
          data: properties.addons.extra_loc,
          placeholder: "Add Barangay, neighborhood or subdivision"
        }}
      />
    </FieldFactory>
    <FieldFactory title="Property Facts">
      <FieldFactory.Input
        renderProps={{
          label: "Starting Price",
          func: handleInputChange,
          name: "starting_price",
          type: "number",
          staticText: "₱"
        }}
      />
      <FieldFactory.Input
        renderProps={{
          label: "Deposit",
          func: handleInputChange,
          name: "deposit",
          type: "number",
          staticText: "₱"
        }}
      />
    </FieldFactory>
    <FieldFactory>
      <FieldFactory.Select
        renderProps={{
          label: "# of Bedrooms",
          func: handleInputChange,
          name: "num_of_bed",
          type: "text",
          icon: "fa fa-bed",
          options: ["Studio", "1", "2", "3", "4", "5+", "Not Applicable"]
        }}
      />
      <FieldFactory.Select
        renderProps={{
          label: "# of Bathrooms",
          func: handleInputChange,
          name: "num_of_bath",
          type: "text",
          icon: "fa fa-bath",
          options: ["1", "2", "3", "4", "5+", "Not Applicable"]
        }}
      />
    </FieldFactory>
    <FieldFactory>
      <FieldFactory.Input
        renderProps={{
          label: "Square Feet",
          func: handleInputChange,
          name: "square_feet",
          type: "text"
        }}
      />
    </FieldFactory>
    <FieldFactory>
      <FieldFactory.Input
        renderProps={{
          label: "Title",
          func: handleInputChange,
          name: "title",
          type: "text"
        }}
      />
    </FieldFactory>
    <FieldFactory>
      <FieldFactory.TextArea
        renderProps={{
          label:
            "Briefly describe your property. List any outstanding features",
          func: handleInputChange,
          name: "description"
        }}
      />
    </FieldFactory>
    <FieldFactory title="Lease details/terms">
      <FieldFactory.CheckBox
        renderProps={{
          label: "6 Months",
          func: handleInputChange,
          name: "six-months",
          value: "6 Months",
          id: "six-months"
        }}
      />
      <FieldFactory.CheckBox
        renderProps={{
          label: "1 Year",
          func: handleInputChange,
          name: "one-year",
          value: "1 Year",
          id: "one-year"
        }}
      />
      <FieldFactory.CheckBox
        renderProps={{
          label: "9 Months",
          func: handleInputChange,
          name: "nine-months",
          value: "9 Months",
          id: "nine-months"
        }}
      />
      <FieldFactory.CheckBox
        renderProps={{
          label: "Month to Month",
          func: handleInputChange,
          name: "month-to-month",
          value: "Month to Month",
          id: "month-to-month"
        }}
      />
      <FieldFactory.CheckBox
        renderProps={{
          label: "Rent to Own",
          func: handleInputChange,
          name: "rent-to-own",
          value: "Rent to Own",
          id: "rent-to-own"
        }}
      />
      <FieldFactory.CheckBox
        renderProps={{
          label: "18 Months",
          func: handleInputChange,
          name: "eighteen-months",
          value: "18 Months",
          id: "eighteen-months"
        }}
      />
      <FieldFactory.CheckBox
        renderProps={{
          label: "2 Yearss",
          func: handleInputChange,
          name: "two-years",
          value: "2 Years",
          id: "two-years"
        }}
      />
    </FieldFactory>
    <FieldFactory>
      <FieldFactory.TextArea
        renderProps={{
          label: "List any lease disclosures here",
          func: handleInputChange,
          name: "least_detail"
        }}
      />
    </FieldFactory>
    <FieldFactory title="Community features">
      <FieldFactory.DynamicInput
        renderProps={{
          label: "Add community features",
          onChange: handleInputChange,
          onClick: trackAddons,
          name: "community_features",
          type: "text",
          icon: "fa fa-search-location",
          data: properties.addons.community_features,
          placeholder: "Basketball Court, Mall, School, Pool"
        }}
      />
    </FieldFactory>
    <FieldFactory title="Pets and Smoking Policies">
      <FieldFactory.Select
        renderProps={{
          isMulti: true,
          data: [
            {
              label: "Dogs",
              name: "dogs_policy",
              icon: "fa fa-paw",
              options: [
                "Allowed",
                "Not Allowed",
                "Call for Info",
                "Not Specified"
              ]
            },
            {
              label: "Cats",
              name: "cats_policy",
              icon: "fa fa-cat",
              options: 0
            },
            {
              label: "Smoking",
              name: "smokin_policy",
              icon: "fa fa-smoking",
              options: [
                "Allowed",
                "Not Allowed",
                "Outside Only",
                "Not Specified"
              ]
            }
          ],
          func: handleInputChange
        }}
      />
    </FieldFactory>
    <FieldFactory>
      <FieldFactory.TextArea
        renderProps={{
          label: "Pet Policy Details",
          func: handleInputChange,
          name: "pets_policy_detail"
        }}
      />
    </FieldFactory>
    <FieldFactory title="Amenities">
      <FieldFactory.DynamicInput
        renderProps={{
          label: "Indoor Amenities",
          onChange: handleInputChange,
          onClick: trackAddons,
          name: "indoor",
          type: "text",
          icon: "fa fa-wifi",
          data: properties.addons.amenities.indoor,
          placeholder: "Air Conditioning, Washer and Dryer, CCTV, Wifi"
        }}
      />
    </FieldFactory>
    <FieldFactory>
      <FieldFactory.DynamicInput
        renderProps={{
          label: "Outdoor Amenities",
          onChange: handleInputChange,
          onClick: trackAddons,
          name: "outdoor",
          type: "text",
          icon: "fa fa-tree",
          data: properties.addons.amenities.outdoor,
          placeholder: "Access Gate, Balcony, Garden"
        }}
      />
    </FieldFactory>
    <FieldFactory>
      <FieldFactory.DynamicInput
        renderProps={{
          label: "Flooring",
          onChange: handleInputChange,
          onClick: trackAddons,
          name: "flooring",
          type: "text",
          icon: "fa fa-th",
          data: properties.addons.flooring,
          placeholder: "Ceramic Tile, Hard wood, Vinyl"
        }}
      />
    </FieldFactory>
    <FieldFactory>
      <FieldFactory.Select
        renderProps={{
          isMulti: true,
          icon: "fa fa-parking",
          data: [
            {
              label: "Dedicated",
              name: "num_of_dedicated_parking",
              options: ["None", "1", "2", "3", "4", "5+"]
            },
            {
              label: "Covered",
              name: "num_of_covered_parking",
              options: 0
            },
            {
              label: "Garage",
              name: "num_of_garage_parking",
              options: 0
            }
          ],
          func: handleInputChange
        }}
      />
    </FieldFactory>
    <FieldFactory title="Gallery">
      <FieldFactory.FileUpload
        renderProps={{
          text: "Upload Property Images",
          addData: addImageData,
          removeData: removeImageData,
          limit: 2
        }}
      />
    </FieldFactory>
  </>
);

export default Fields;
