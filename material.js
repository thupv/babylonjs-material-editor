var constants = {
  combine: {
    'THREE.MultiplyOperation': THREE.MultiplyOperation,
    'THREE.MixOperation': THREE.MixOperation,
    'THREE.AddOperation': THREE.AddOperation
  },

  side: {
    'THREE.FrontSide': THREE.FrontSide,
    'THREE.BackSide': THREE.BackSide,
    'THREE.DoubleSide': THREE.DoubleSide
  },

  colors: {
    'THREE.NoColors': THREE.NoColors,
    'THREE.FaceColors': THREE.FaceColors,
    'THREE.VertexColors': THREE.VertexColors
  },

  blendingMode: {
    'THREE.NoBlending': THREE.NoBlending,
    'THREE.NormalBlending': THREE.NormalBlending,
    'THREE.AdditiveBlending': THREE.AdditiveBlending,
    'THREE.SubtractiveBlending': THREE.SubtractiveBlending,
    'THREE.MultiplyBlending': THREE.MultiplyBlending,
    'THREE.CustomBlending': THREE.CustomBlending
  },

  equations: {
    'THREE.AddEquation': THREE.AddEquation,
    'THREE.SubtractEquation': THREE.SubtractEquation,
    'THREE.ReverseSubtractEquation': THREE.ReverseSubtractEquation
  },

  destinationFactors: {
    'THREE.ZeroFactor': THREE.ZeroFactor,
    'THREE.OneFactor': THREE.OneFactor,
    'THREE.SrcColorFactor': THREE.SrcColorFactor,
    'THREE.OneMinusSrcColorFactor': THREE.OneMinusSrcColorFactor,
    'THREE.SrcAlphaFactor': THREE.SrcAlphaFactor,
    'THREE.OneMinusSrcAlphaFactor': THREE.OneMinusSrcAlphaFactor,
    'THREE.DstAlphaFactor': THREE.DstAlphaFactor,
    'THREE.OneMinusDstAlphaFactor': THREE.OneMinusDstAlphaFactor
  },

  sourceFactors: {
    'THREE.DstColorFactor': THREE.DstColorFactor,
    'THREE.OneMinusDstColorFactor': THREE.OneMinusDstColorFactor,
    'THREE.SrcAlphaSaturateFactor': THREE.SrcAlphaSaturateFactor
  }

};
var type = ['MeshBasicMaterial', 'MeshLambertMaterial', 'MeshPhongMaterial', 'MeshStandardMaterial', 'MeshPhysicalMaterial', 'MeshDepthMaterial', 'MeshNormalMaterial', 'LineBasicMaterial'];
var materialFolder, materialPropertyFolder;

function getObjectsKeys(obj) {
  var keys = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }
  return keys;
}

var envMaps = (function () {
  var path = 'skybox/';
  var format = '.jpg';
  var urls = [
    path + 'px' + format, path + 'nx' + format,
    path + 'py' + format, path + 'ny' + format,
    path + 'pz' + format, path + 'nz' + format
  ];

  var reflectionCube = new THREE.CubeTextureLoader().load(urls);
  reflectionCube.format = THREE.RGBFormat;

  var refractionCube = new THREE.CubeTextureLoader().load(urls);
  refractionCube.mapping = THREE.CubeRefractionMapping;
  refractionCube.format = THREE.RGBFormat;
  return {
    none: null,
    reflection: reflectionCube,
    refraction: refractionCube
  };

})();
var materials = {};

var envMapKeys = getObjectsKeys(envMaps);

var serverTextures = {
  none: null,
  brick_grey: new THREE.TextureLoader().load('./terrain/brick_grey.png'),
  brick_red: new THREE.TextureLoader().load('./terrain/brick_red.png'),
  cactus_inside: new THREE.TextureLoader().load('./terrain/cactus_inside.png'),
  cactus_side: new THREE.TextureLoader().load('./terrain/cactus_side.png'),
  cactus_top: new THREE.TextureLoader().load('./terrain/cactus_top.png'),
  cotton_blue: new THREE.TextureLoader().load('./terrain/cotton_blue.png'),
  cotton_green: new THREE.TextureLoader().load('./terrain/cotton_green.png'),
  cotton_red: new THREE.TextureLoader().load('./terrain/cotton_red.png'),
  cotton_tan: new THREE.TextureLoader().load('./terrain/cotton_tan.png'),
  dirt: new THREE.TextureLoader().load('./terrain/dirt.png'),
  dirt_grass: new THREE.TextureLoader().load('./terrain/dirt_grass.png'),
  dirt_sand: new THREE.TextureLoader().load('./terrain/dirt_sand.png'),
  glass: new THREE.TextureLoader().load('./terrain/glass.png'),
  glass_frame: new THREE.TextureLoader().load('./terrain/glass_frame.png'),
  grass_top: new THREE.TextureLoader().load('./terrain/grass_top.png'),
  gravel_dirt: new THREE.TextureLoader().load('./terrain/gravel_dirt.png'),
  gravel_stone: new THREE.TextureLoader().load('./terrain/gravel_stone.png'),
  greysand: new THREE.TextureLoader().load('./terrain/greysand.png'),
  greystone: new THREE.TextureLoader().load('./terrain/greystone.png'),
  greystone_ruby: new THREE.TextureLoader().load('./terrain/greystone_ruby.png'),
  greystone_ruby_alt: new THREE.TextureLoader().load('./terrain/greystone_ruby_alt.png'),
  greystone_sand: new THREE.TextureLoader().load('./terrain/greystone_sand.png'),
  ice_o: new THREE.TextureLoader().load('./terrain/ice.png'),
  lava: new THREE.TextureLoader().load('./terrain/lava.png'),
  leaves: new THREE.TextureLoader().load('./terrain/leaves.png'),
  leaves_orange: new THREE.TextureLoader().load('./terrain/leaves_orange.png'),
  leaves_orange_transparent: new THREE.TextureLoader().load('./terrain/leaves_orange_transparent.png'),
  leaves_transparent: new THREE.TextureLoader().load('./terrain/leaves_transparent.png'),
  redsand: new THREE.TextureLoader().load('./terrain/redsand.png'),
  redstone: new THREE.TextureLoader().load('./terrain/redstone.png'),
  redstone_emerald: new THREE.TextureLoader().load('./terrain/redstone_emerald.png'),
  redstone_emerald_alt: new THREE.TextureLoader().load('./terrain/redstone_emerald_alt.png'),
  redstone_sand: new THREE.TextureLoader().load('./terrain/redstone_sand.png'),
  sand: new THREE.TextureLoader().load('./terrain/sand.png'),
  snow: new THREE.TextureLoader().load('./terrain/snow.png'),
  stone_browniron: new THREE.TextureLoader().load('./terrain/stone_browniron.png'),
  stone_browniron_alt: new THREE.TextureLoader().load('./terrain/stone_browniron_alt.png'),
  stone_coal: new THREE.TextureLoader().load('./terrain/stone_coal.png'),
  stone_coal_alt: new THREE.TextureLoader().load('./terrain/stone_coal_alt.png'),
  stone_diamond: new THREE.TextureLoader().load('./terrain/stone_diamond.png'),
  stone_diamond_alt: new THREE.TextureLoader().load('./terrain/stone_diamond_alt.png'),
  stone_dirt: new THREE.TextureLoader().load('./terrain/stone_dirt.png'),
  stone_gold: new THREE.TextureLoader().load('./terrain/stone_gold.png'),
  stone_gold_alt: new THREE.TextureLoader().load('./terrain/stone_gold_alt.png'),
  stone_grass: new THREE.TextureLoader().load('./terrain/stone_grass.png'),
  stone_iron: new THREE.TextureLoader().load('./terrain/stone_iron.png'),
  stone_iron_alt: new THREE.TextureLoader().load('./terrain/stone_iron_alt.png'),
  stone_sand: new THREE.TextureLoader().load('./terrain/stone_sand.png'),
  stone_silver: new THREE.TextureLoader().load('./terrain/stone_silver.png'),
  stone_silver_alt: new THREE.TextureLoader().load('./terrain/stone_silver_alt.png'),
  stone_snow: new THREE.TextureLoader().load('./terrain/stone_snow.png'),
  trunk_side: new THREE.TextureLoader().load('./terrain/trunk_side.png'),
  trunk_top: new THREE.TextureLoader().load('./terrain/trunk_top.png'),
  trunk_white_side: new THREE.TextureLoader().load('./terrain/trunk_white_side.png'),
  trunk_white_top: new THREE.TextureLoader().load('./terrain/trunk_white_top.png'),
  water: new THREE.TextureLoader().load('./terrain/water.png'),
  wood_o: new THREE.TextureLoader().load('./terrain/wood.png'),
  wood_red: new THREE.TextureLoader().load('./terrain/wood_red.png'),
  gold: new THREE.TextureLoader().load('./terrain/gold.jpg'),

  // brick: new THREE.TextureLoader().load('./terrain/custom/brick.jpg'),
  // brick_nm: new THREE.TextureLoader().load('./terrain/custom/brick-nm.png'),
  // diamond: new THREE.TextureLoader().load('./terrain/custom/diamond.png'),
  // diamond_nm: new THREE.TextureLoader().load('./terrain/custom/diamond-nm.png'),
  // fur: new THREE.TextureLoader().load('./terrain/custom/fur.jpg'),
  // fur_nm: new THREE.TextureLoader().load('./terrain/custom/fur-nm.png'),
  // gold_nm: new THREE.TextureLoader().load('./terrain/custom/gold-nm.png'),
  // ice: new THREE.TextureLoader().load('./terrain/custom/ice.png'),
  // ice_nm: new THREE.TextureLoader().load('./terrain/custom/ice-nm.png'),
  // iron: new THREE.TextureLoader().load('./terrain/custom/iron.jpg'),
  // iron_nm: new THREE.TextureLoader().load('./terrain/custom/iron-nm.png'),
  // leaf: new THREE.TextureLoader().load('./terrain/custom/leaf.png'),
  // leaf_nm: new THREE.TextureLoader().load('./terrain/custom/leaf-nm.png'),
  // paper: new THREE.TextureLoader().load('./terrain/custom/paper.jpg'),
  // paper_nm: new THREE.TextureLoader().load('./terrain/custom/paper-nm.png'),
  // rock: new THREE.TextureLoader().load('./terrain/custom/rock.jpg'),
  // rock_nm: new THREE.TextureLoader().load('./terrain/custom/rock-nm.png'),
  // silver: new THREE.TextureLoader().load('./terrain/custom/silver.jpg'),
  // silver_nm: new THREE.TextureLoader().load('./terrain/custom/silver-nm.png'),
  // wood: new THREE.TextureLoader().load('./terrain/custom/wood.jpg'),
  // wood_nm: new THREE.TextureLoader().load('./terrain/custom/wood-nm.png')
  'brick-nhu': new THREE.TextureLoader().load('./terrain/custom/brick.jpg'),
  'brick-nm-nhu': new THREE.TextureLoader().load('./terrain/custom/brick-nm.png'),
  'diamond-nhu': new THREE.TextureLoader().load('./terrain/custom/diamond.png'),
  'diamond-nm-nhu': new THREE.TextureLoader().load('./terrain/custom/diamond-nm.png'),
  'fur-nhu': new THREE.TextureLoader().load('./terrain/custom/fur.jpg'),
  'fur-nm-nhu': new THREE.TextureLoader().load('./terrain/custom/fur-nm.png'),
  'gold-nmNhu': new THREE.TextureLoader().load('./terrain/custom/gold-nm.png'),
  'ice-nhu': new THREE.TextureLoader().load('./terrain/custom/ice.png'),
  'ice-nm-nhu': new THREE.TextureLoader().load('./terrain/custom/ice-nm.png'),
  'iron-nhu': new THREE.TextureLoader().load('./terrain/custom/iron.jpg'),
  'iron-nm-nhu': new THREE.TextureLoader().load('./terrain/custom/iron-nm.png'),
  'leaf-nhu': new THREE.TextureLoader().load('./terrain/custom/leaf.png'),
  'leaf-nm-nhu': new THREE.TextureLoader().load('./terrain/custom/leaf-nm.png'),
  'paper-nhu': new THREE.TextureLoader().load('./terrain/custom/paper.jpg'),
  'paper-nm-nhu': new THREE.TextureLoader().load('./terrain/custom/paper-nm.png'),
  'stone-nhu': new THREE.TextureLoader().load('./terrain/custom/rock.jpg'),
  'stone-nm-nhu': new THREE.TextureLoader().load('./terrain/custom/rock-nm.png'),
  'silver-nhu': new THREE.TextureLoader().load('./terrain/custom/silver.jpg'),
  'silver-nm-nhu': new THREE.TextureLoader().load('./terrain/custom/silver-nm.png'),
  'plastic-nhu': new THREE.TextureLoader().load('./terrain/custom/plastic.jpg'),
  'plastic-nm-nhu': new THREE.TextureLoader().load('./terrain/custom/plastic-nm.png'),
  'wood-nhu': new THREE.TextureLoader().load('./terrain/custom/wood.jpg'),
  'wood-nm-nhu': new THREE.TextureLoader().load('./terrain/custom/wood-nm.png')
};

var retrievedTextures = localStorage.getItem('customTextures');
var textures = serverTextures;
var customTextures = {};
if (retrievedTextures) {
  customTextures = JSON.parse(retrievedTextures);
  var newTextures = {};
  for (var k in customTextures) {
    if (customTextures.hasOwnProperty(k)) {
      newTextures[k] = THREE.ImageUtils.loadTexture(customTextures[k]);
    }
  }
  textures = Object.assign(textures, newTextures);
}


var textureMaps = (function () {
  return textures;
})();

var textureMapKeys = getObjectsKeys(textureMaps);
var selectedTexture;
var selectedTextureBase64;

function generateVertexColors(geometry) {
  for (var i = 0, il = geometry.faces.length; i < il; i++) {
    geometry.faces[i].vertexColors.push(new THREE.Color().setHSL(
      i / il * Math.random(),
      0.5,
      0.5
    ));
    geometry.faces[i].vertexColors.push(new THREE.Color().setHSL(
      i / il * Math.random(),
      0.5,
      0.5
    ));
    geometry.faces[i].vertexColors.push(new THREE.Color().setHSL(
      i / il * Math.random(),
      0.5,
      0.5
    ));
    geometry.faces[i].color = new THREE.Color().setHSL(
      i / il * Math.random(),
      0.5,
      0.5
    );
  }
}

function generateMorphTargets(mesh, geometry) {
  var vertices = [], scale;
  for (var i = 0; i < geometry.vertices.length; i++) {
    vertices.push(geometry.vertices[i].clone());
    scale = 1 + Math.random() * 0.3;
    vertices[vertices.length - 1].x *= scale;
    vertices[vertices.length - 1].y *= scale;
    vertices[vertices.length - 1].z *= scale;
  }
  geometry.morphTargets.push({name: 'target1', vertices: vertices});
}

function handleColorChange(color) {
  return function (value) {
    if (typeof value === 'string') {
      value = value.replace('#', '0x');
    }
    color.setHex(value);
  };
}

function needsUpdate(material, geometry) {
  return function () {
    material.vertexColors = +material.vertexColors; //Ensure number
    material.side = +material.side; //Ensure number
    material.needsUpdate = true;
    geometry.verticesNeedUpdate = true;
    geometry.normalsNeedUpdate = true;
    geometry.colorsNeedUpdate = true;
  };
}

function updateMorphs(torus, material) {
  return function () {
    torus.updateMorphTargets();
    material.needsUpdate = true;
  };
}

function updateTexture(material, materialKey, textures) {
  return function (key) {
    material[materialKey] = textures[key];
    material.needsUpdate = true;
  };
}

function guiScene(gui, scene) {
  var folder = gui.addFolder('Scene');
  var data = {
    background: '#000000'
  };
  gui.remember(data);
  var color = new THREE.Color();
  var colorConvert = handleColorChange(color);
  // folder.addColor(data, 'background').onChange(function (value) {
  //   colorConvert(value);
  //   renderer.setClearColor(color.getHex());
  // });
  // folder.addColor(data, 'ambient light').onChange(handleColorChange(ambientLight.color));
//  guiSceneFog(folder, scene);
}

function guiAction(gui, scene, mesh) {
  var folder = gui.addFolder('Action');
  var data = {
    'clearData': function () {
      localStorage.clear();
    },
    'export': function () {
      var materialData = mesh.material.toJSON();
      materialData.images.forEach((img)=>{
        img.url = '';
      });
      var a = document.createElement("a");
      var file = new Blob([JSON.stringify(materialData)], {type: 'text/plain'});
      a.href = URL.createObjectURL(file);
      a.download = 'material.json';
      a.click();
    },
    'export2D': function () {
      let imgData = renderer.domElement.toDataURL("image/png");
      console.log(imgData);
      var a = document.createElement("a");
      a.href = imgData;
      a.download = 'image.png';
      a.click();
    }
  };
  folder.add(data, 'clearData');
  folder.add(data, 'export');
  folder.add(data, 'export2D');
}

function guiSceneFog(folder, scene) {

  var fogFolder = folder.addFolder('scene.fog');

  var fog = new THREE.Fog(0x3f7b9d, 0, 60);

  var data = {
    fog: {
      'THREE.Fog()': false,
      'scene.fog.color': fog.color.getHex()
    }
  };

  fogFolder.add(data.fog, 'THREE.Fog()').onChange(function (useFog) {

    if (useFog) {

      scene.fog = fog;

    } else {

      scene.fog = null;

    }

  });

  fogFolder.addColor(data.fog, 'scene.fog.color').onChange(handleColorChange(fog.color));

}

function guiMaterialType(gui, scene, mesh, geometry) {
  var folder = gui.addFolder('MaterialType');
  var data = {
    type: type[0]
  };
  gui.remember(data);
  folder.add(data, 'type', type).onChange(function (t) {
    changeType(t, mesh);
  });
}

function guiShareMaterial(folder, material, geometry) {
  folder.add(material, 'transparent');
  folder.add(material, 'opacity', 0, 1);
  folder.add(material, 'blending', constants.blendingMode);
  folder.add(material, 'blendSrc', constants.destinationFactors);
  folder.add(material, 'blendDst', constants.destinationFactors);
  folder.add(material, 'blendEquation', constants.equations);
  folder.add(material, 'depthTest');
  folder.add(material, 'depthWrite');
  folder.add(material, 'polygonOffset');
  folder.add(material, 'polygonOffsetFactor');
  folder.add(material, 'polygonOffsetUnits');
  folder.add(material, 'alphaTest', 0, 1);
  folder.add(material, 'overdraw', 0, 5);
  folder.add(material, 'visible');
  folder.add(material, 'side', constants.side).onChange(needsUpdate(material, geometry));
  return folder;
}

function guiMeshBasicMaterial(gui, mesh, material, geometry) {
  var data = {
    color: material.color.getHex(),
    envMaps: envMapKeys,
    map: textureMapKeys,
    specularMap: textureMapKeys,
    alphaMap: textureMapKeys
  };
  gui.remember(data);

  var folder = gui.addFolder('THREE.MeshBasicMaterial');
  folder.addColor(data, 'color').onChange(handleColorChange(material.color));
  folder.add(material, 'wireframe');
  folder.add(material, 'wireframeLinewidth', 0, 10);
  folder.add(material, 'vertexColors', constants.colors).onChange(needsUpdate(material, geometry));
  folder.add(material, 'fog');
  folder.add(data, 'envMaps', envMapKeys).onChange(updateTexture(material, 'envMap', envMaps));
  folder.add(data, 'map', textureMapKeys).onChange(updateTexture(material, 'map', textureMaps));
  folder.add(data, 'specularMap', textureMapKeys).onChange(updateTexture(material, 'specularMap', textureMaps));
  folder.add(data, 'alphaMap', textureMapKeys).onChange(updateTexture(material, 'alphaMap', textureMaps));
  folder.add(material, 'morphTargets').onChange(updateMorphs(mesh, material));
  folder.add(material, 'combine', constants.combine).onChange(updateMorphs(mesh, material));
  folder.add(material, 'reflectivity', 0, 1);
  folder.add(material, 'refractionRatio', 0, 1);
  return folder;
}

function guiMeshDepthMaterial(gui, mesh, material, geometry) {

  var folder = gui.addFolder('THREE.MeshDepthMaterial');

  folder.add(material, 'wireframe');
  folder.add(material, 'wireframeLinewidth', 0, 10);
  folder.add(material, 'morphTargets').onChange(updateMorphs(mesh, material));
  return folder;

}

function guiMeshNormalMaterial(gui, mesh, material, geometry) {

  var folder = gui.addFolder('THREE.MeshNormalMaterial');

  folder.add(material, 'flatShading').onChange(needsUpdate(material, geometry));
  folder.add(material, 'wireframe');
  folder.add(material, 'wireframeLinewidth', 0, 10);
  folder.add(material, 'morphTargets').onChange(updateMorphs(mesh, material));
  return folder;

}

function guiLineBasicMaterial(gui, mesh, material, geometry) {

  var data = {
    color: material.color.getHex()
  };
  gui.remember(data);
  var folder = gui.addFolder('THREE.LineBasicMaterial');

  folder.addColor(data, 'color').onChange(handleColorChange(material.color));
  folder.add(material, 'linewidth', 0, 10);
  folder.add(material, 'linecap', ['butt', 'round', 'square']);
  folder.add(material, 'linejoin', ['round', 'bevel', 'miter']);
  folder.add(material, 'vertexColors', constants.colors).onChange(needsUpdate(material, geometry));
  folder.add(material, 'fog');
  return folder;

}

function guiMeshLambertMaterial(gui, mesh, material, geometry) {

  var data = {
    color: material.color.getHex(),
    emissive: material.emissive.getHex(),
    emissiveMaps: textureMapKeys,
    lightMap: textureMapKeys,
    envMaps: envMapKeys,
    map: textureMapKeys,
    specularMap: textureMapKeys,
    alphaMap: textureMapKeys
  };
  gui.remember(data);

  var folder = gui.addFolder('THREE.MeshLambertMaterial');

  folder.addColor(data, 'color').onChange(handleColorChange(material.color));
  folder.addColor(data, 'emissive').onChange(handleColorChange(material.emissive));
  folder.add(data, 'emissiveMaps', textureMapKeys).onChange(updateTexture(material, 'emissiveMap', textureMaps));
  folder.add(material, 'emissiveIntensity', 0, 10);

  folder.add(material, 'wireframe');
  folder.add(material, 'wireframeLinewidth', 0, 10);
  folder.add(material, 'vertexColors', constants.colors).onChange(needsUpdate(material, geometry));
  folder.add(material, 'fog');

  folder.add(data, 'lightMap', textureMapKeys).onChange(updateTexture(material, 'lightMap', textureMaps));
  folder.add(material, 'lightMapIntensity', 0, 10);

  folder.add(data, 'specularMap', textureMapKeys).onChange(updateTexture(material, 'specularMap', textureMaps));

  folder.add(data, 'envMaps', envMapKeys).onChange(updateTexture(material, 'envMap', envMaps));
  folder.add(data, 'map', textureMapKeys).onChange(updateTexture(material, 'map', textureMaps));
  folder.add(data, 'specularMap', textureMapKeys).onChange(updateTexture(material, 'specularMap', textureMaps));
  folder.add(data, 'alphaMap', textureMapKeys).onChange(updateTexture(material, 'alphaMap', textureMaps));
  folder.add(material, 'morphTargets').onChange(updateMorphs(mesh, material));
  folder.add(material, 'combine', constants.combine).onChange(updateMorphs(mesh, material));
  folder.add(material, 'reflectivity', 0, 1);
  folder.add(material, 'refractionRatio', 0, 1);
  //folder.add( material, 'skinning' );
  return folder;

}

function guiMeshPhongMaterial(gui, mesh, material, geometry) {

  var data = {
    color: material.color.getHex(),
    emissive: material.emissive.getHex(),
    specular: material.specular.getHex(),
    envMaps: envMapKeys,
    alphaMaps: textureMapKeys,
    aoMaps: textureMapKeys,
    aoMapIntensity: textureMapKeys,
    bumpMap: textureMapKeys,
    displacementMap: textureMapKeys,
    emissiveMap: textureMapKeys,
    normalMap: textureMapKeys,
    map: textureMapKeys,
    lightMap: textureMapKeys,
    specularMap: textureMapKeys,
    alphaMap: textureMapKeys
  };
  gui.remember(data);

  var folder = gui.addFolder('THREE.MeshPhongMaterial');

  folder.addColor(data, 'color').onChange(handleColorChange(material.color));
  folder.addColor(data, 'emissive').onChange(handleColorChange(material.emissive));
  folder.addColor(data, 'specular').onChange(handleColorChange(material.specular));

  folder.add(material, 'shininess', 0, 100);
  folder.add(material, 'flatShading').onChange(needsUpdate(material, geometry));
  folder.add(material, 'wireframe');
  folder.add(material, 'wireframeLinewidth', 0, 10);
  folder.add(material, 'vertexColors', constants.colors);
  folder.add(material, 'fog');
  folder.add(data, 'envMaps', envMapKeys).onChange(updateTexture(material, 'envMap', envMaps));
  folder.add(data, 'map', textureMapKeys).onChange(updateTexture(material, 'map', textureMaps));
  folder.add(data, 'alphaMaps', textureMapKeys).onChange(updateTexture(material, 'alphaMaps', textureMaps));
  folder.add(data, 'aoMaps', textureMapKeys).onChange(updateTexture(material, 'aoMaps', textureMaps));
  folder.add(data, 'bumpMap', textureMapKeys).onChange(updateTexture(material, 'bumpMap', textureMaps));
  folder.add(data, 'displacementMap', textureMapKeys).onChange(updateTexture(material, 'displacementMap', textureMaps));
  folder.add(data, 'emissiveMap', textureMapKeys).onChange(updateTexture(material, 'emissiveMap', textureMaps));
  folder.add(data, 'normalMap', textureMapKeys).onChange(updateTexture(material, 'normalMap', textureMaps));

  folder.add(data, 'lightMap', textureMapKeys).onChange(updateTexture(material, 'lightMap', textureMaps));
  folder.add(data, 'specularMap', textureMapKeys).onChange(updateTexture(material, 'specularMap', textureMaps));
  folder.add(data, 'alphaMap', textureMapKeys).onChange(updateTexture(material, 'alphaMap', textureMaps));
  return folder;

}

function guiMeshStandardMaterial(gui, mesh, material, geometry) {

  var data = {
    color: material.color.getHex(),
    emissive: material.emissive.getHex(),
    envMaps: envMapKeys,
    map: textureMapKeys,
    aoMap: textureMapKeys,
    bumpMap: textureMapKeys,
    displacementMap: textureMapKeys,
    emissiveMap: textureMapKeys,
    metalnessMap: textureMapKeys,
    normalMap: textureMapKeys,
    roughnessMap: textureMapKeys,
    lightMap: textureMapKeys,
    specularMap: textureMapKeys,
    alphaMap: textureMapKeys
  };

  var folder = gui.addFolder('THREE.MeshStandardMaterial');

  folder.addColor(data, 'color').onChange(handleColorChange(material.color));
  folder.addColor(data, 'emissive').onChange(handleColorChange(material.emissive));

  folder.add(material, 'roughness', 0, 1);
  folder.add(material, 'metalness', 0, 1);
  folder.add(material, 'flatShading').onChange(needsUpdate(material, geometry));
  folder.add(material, 'wireframe');
  folder.add(material, 'wireframeLinewidth', 0, 10);
  folder.add(material, 'vertexColors', constants.colors);
  folder.add(material, 'fog');

  folder.add(data, 'envMaps', envMapKeys).onChange(updateTexture(material, 'envMap', envMaps));
  folder.add(data, 'map', textureMapKeys).onChange(updateTexture(material, 'map', textureMaps));
  folder.add(data, 'aoMap', textureMapKeys).onChange(updateTexture(material, 'aoMap', textureMaps));
  folder.add(data, 'bumpMap', textureMapKeys).onChange(updateTexture(material, 'bumpMap', textureMaps));
  folder.add(data, 'displacementMap', textureMapKeys).onChange(updateTexture(material, 'displacementMap', textureMaps));
  folder.add(data, 'emissiveMap', textureMapKeys).onChange(updateTexture(material, 'emissiveMap', textureMaps));
  folder.add(data, 'metalnessMap', textureMapKeys).onChange(updateTexture(material, 'metalnessMap', textureMaps));
  folder.add(data, 'normalMap', textureMapKeys).onChange(updateTexture(material, 'normalMap', textureMaps));
  folder.add(data, 'roughnessMap', textureMapKeys).onChange(updateTexture(material, 'roughnessMap', textureMaps));
  folder.add(data, 'specularMap', textureMapKeys).onChange(updateTexture(material, 'specularMap', textureMaps));

  folder.add(data, 'lightMap', textureMapKeys).onChange(updateTexture(material, 'lightMap', textureMaps));
  folder.add(data, 'alphaMap', textureMapKeys).onChange(updateTexture(material, 'alphaMap', textureMaps));
  gui.remember(data);

  return folder;

}

function guiMeshPhysicalMaterial(gui, mesh, material, geometry) {

  var data = {
    color: material.color.getHex(),
    emissive: material.emissive.getHex(),
    envMaps: envMapKeys,
    map: textureMapKeys,
    lightMap: textureMapKeys,
    specularMap: textureMapKeys,
    alphaMap: textureMapKeys
  };
  gui.remember(data);

  var folder = gui.addFolder('THREE.MeshPhysicalMaterial');

  folder.addColor(data, 'color').onChange(handleColorChange(material.color));
  folder.addColor(data, 'emissive').onChange(handleColorChange(material.emissive));

  folder.add(material, 'roughness', 0, 1);
  folder.add(material, 'metalness', 0, 1);
  folder.add(material, 'reflectivity', 0, 1);
  folder.add(material, 'clearCoat', 0, 1).step(0.01);
  folder.add(material, 'clearCoatRoughness', 0, 1).step(0.01);
  folder.add(material, 'flatShading').onChange(needsUpdate(material, geometry));
  folder.add(material, 'wireframe');
  folder.add(material, 'wireframeLinewidth', 0, 10);
  folder.add(material, 'vertexColors', constants.colors);
  folder.add(material, 'fog');
  folder.add(data, 'envMaps', envMapKeys).onChange(updateTexture(material, 'envMap', envMaps));
  folder.add(data, 'map', textureMapKeys).onChange(updateTexture(material, 'map', textureMaps));
  folder.add(data, 'lightMap', textureMapKeys).onChange(updateTexture(material, 'lightMap', textureMaps));
  folder.add(data, 'alphaMap', textureMapKeys).onChange(updateTexture(material, 'alphaMap', textureMaps));
  return folder;
}

function changeType(t, mesh) {
  mesh.material = materials[t];
}

function guiAddTexture(gui, mesh, geometry) {
  var customTextureKeys = getObjectsKeys(customTextures);
  var data = {
    loadFile: function () {
      document.getElementById('newTexture').click();
    },
    textureName: '',
    addCustomTexture: function () {
      let key = data.textureName;
      if (key === '') {
        alert('need name');
        return;
      }
      if (textures[key]) {
        alert('Texture ' + key + ' already exist');
        return;
      }
      customTextures[key] = selectedTextureBase64;
      localStorage.setItem('customTextures', JSON.stringify(customTextures));
      textures[key] = THREE.ImageUtils.loadTexture(selectedTextureBase64);
      textureMapKeys = getObjectsKeys(textureMaps);
      data.textureName = '';
      alert('Texture ' + key + ' was added');
    },
    deleteCustomTexture: function () {
      let key = data.textureName;
      if (customTextures[key]) {
        delete customTextures[key];
        localStorage.setItem('customTextures', JSON.stringify(customTextures));
        alert('Texture ' + key + ' deleted');
      } else {
        alert('Texture ' + key + ' not exist');
      }
    }
  };
  var folder = gui.addFolder('Custom texture');
  folder.add(data, 'loadFile');
  folder.add(data, 'textureName').listen();
  folder.add(data, 'addCustomTexture');
  folder.add(data, 'deleteCustomTexture');

  return folder;
}

function changeInputTexture(e) {
  var userImage = e.target.files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    console.log(reader.result);
    selectedTextureBase64 = reader.result;
  };
  reader.readAsDataURL(userImage);
  var userImageURL = URL.createObjectURL(userImage);
  var loader = new THREE.TextureLoader();
  loader.setCrossOrigin("");
  selectedTexture = loader.load(userImageURL);
}

function init(mesh, geometry, gui) {
  type.forEach(function (type) {
    materials[type] = initMaterial(type, gui, mesh, geometry);
  });
  mesh.material = materials['MeshStandardMaterial'];
}

function initMaterial(materialType, gui, mesh, geometry) {
  var material;
  switch (materialType) {
    case 'MeshBasicMaterial' :
      material = new THREE.MeshBasicMaterial();
      gui.remember(material);
      materialPropertyFolder = guiMeshBasicMaterial(gui, mesh, material, geometry);
      break;

    case 'MeshLambertMaterial' :
      material = new THREE.MeshLambertMaterial();
      gui.remember(material);
      materialPropertyFolder = guiMeshLambertMaterial(gui, mesh, material, geometry);
      break;

    case 'MeshPhongMaterial' :
      material = new THREE.MeshPhongMaterial();
      gui.remember(material);
      materialPropertyFolder = guiMeshPhongMaterial(gui, mesh, material, geometry);
      break;

    case 'MeshStandardMaterial' :
      material = new THREE.MeshStandardMaterial();
      gui.remember(material);
      materialPropertyFolder = guiMeshStandardMaterial(gui, mesh, material, geometry);
      break;

    case 'MeshPhysicalMaterial' :
      material = new THREE.MeshPhysicalMaterial();
      gui.remember(material);
      materialPropertyFolder = guiMeshPhysicalMaterial(gui, mesh, material, geometry);
      break;

    case 'MeshDepthMaterial' :
      material = new THREE.MeshDepthMaterial();
      gui.remember(material);
      materialPropertyFolder = guiMeshDepthMaterial(gui, mesh, material, geometry);
      break;

    case 'MeshNormalMaterial' :
      material = new THREE.MeshNormalMaterial();
      gui.remember(material);
      materialPropertyFolder = guiMeshNormalMaterial(gui, mesh, material, geometry);
      break;

    case 'LineBasicMaterial' :
      material = new THREE.LineBasicMaterial();
      gui.remember(material);
      materialPropertyFolder = guiLineBasicMaterial(gui, mesh, material, geometry);
      break;
  }
  guiShareMaterial(materialPropertyFolder, material, geometry);
  return material;
}
