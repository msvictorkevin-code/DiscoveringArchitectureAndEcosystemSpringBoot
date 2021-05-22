package com.bolsadeideas.springboot.backend.apirest.auth;

public class JwtConfig {
    public  static final String LLAVE_SECRETA = "123456789";
    public  static final String RSA_PRIVADA = "-----BEGIN RSA PRIVATE KEY-----\n" +
            "MIIEowIBAAKCAQEApQvtn7LCEAb8hHGTFhwehAYIsHW1BGXzRt7BCpxXy1h/7BXC\n" +
            "w1x/cunLFmp9HV6+CkWXJoRo29ob/Gf87nk7x5pLidHz11zeGfklm6WGKuqqdvHc\n" +
            "Q3qa4xhDbas3yjRgNtksvlNbwA1NLxxNVUCXCnVIFTD5uUmAL5kXV3LT9u0TDnSU\n" +
            "FmO5g4Or8C9CqKqQ8rfcfm9xiW+DiBGgBXBozyky383LNmoKQtmDAQLBKbZ9UYLx\n" +
            "iRC1yHU1aEPOahTa66jMTcQdO5fqPkytNws6OhDPjaoSOTei51yxMbzNEZTwlVcz\n" +
            "zZ2QDmsiR93wnF2Agf/4YU4MWYAsBVlrkRWO/wIDAQABAoIBABKGcDmImvepkRZc\n" +
            "mSHWLiardrY3wAWqW9AMmKZUPhZ47ILXPnEnJLcFPuJZOYneZH5KqViNbCehJ5sB\n" +
            "IQazXN5elzP0+OWnataHfI0n2xNeG5wWMZ7xWAk9Y/QfT7fGgTYm0jraqGW6GHu9\n" +
            "NYDoKwvldh3KzXzanyS4jkImhVwlud9i8A+okWhYvj/0IFyLIDlmgIUwa8ra+hZz\n" +
            "0dTwGIWV2hTjs+y0nM6Ob/sk1dUp3Gm8h6O3mwjHzUfkMOmB7+COXbbnWGM2zqnD\n" +
            "GnG7kX/U6owIWFud8wByVFcftqAPtbvqtFv2Qz4ysOp8/Hoy0qDNzE+SEP2termY\n" +
            "ChbQuwECgYEA0/uPTUhL7NfshjFi2F5KGHHvOSdWv1rCy97c4ZdoXhyLd6yQ/q5h\n" +
            "kxf2EnT6djB4uAmazig3bDBb16LpojGVH8MsBBVYfGDsHLIDqzbrTYK1HxtJxrbD\n" +
            "dCro5tmPmvloGLE+mjwOke0ej4y9P+WrQVUC75BFORRhsDJECAR45l8CgYEAx1Fe\n" +
            "9kDqhTnIwO+Tv1J3+Eaj0h/MhCFajZIrr4ImMt6pb6ew3lXmclMBjx4H+v/vEHdX\n" +
            "32/oyGW/OmxZK5rRiTxQ2mmF9oQc6YIzbHbMJjqvRPJYWLxIhRmI7B72AlrGC/eR\n" +
            "1rn57j6asti2X3IXj18WeGmFiM27xcZ1c7yt22ECgYAW7S4ifZ84jmHWYaD/JbN9\n" +
            "0VS+KbMIHxjSU9gvzeBLzWqIFvHXmaST9BN5C43LGpLz1JYZld/oo5JLUCNUl2g5\n" +
            "dzJbfrODQDhJIjejXN02FNzh8GGaTEn3Vmy6Cu2tJSxM/1517+jjf3G+tMoDDyPm\n" +
            "fPtETaYu9jVaiRUyiMlKoQKBgQCpgcsn0+deq9jONDFLmWAL1k+F6KMuj4sKMRBT\n" +
            "73R6+J/SJCOnwhf8jBkcVKbm0HfIYiZqECtBGj65+eEP01d1xcThKrLSBmLsN11y\n" +
            "VcmijW/3S77UoDNwdlnarS38rKQXE1GE8p7Z/YXkqabXnxjoRi6+8saspIKXXQMQ\n" +
            "DZsxoQKBgHIgOFhzfHa9Xbu/XiizUfb0+y8jFC+f3sZ+NcvKc1q6EA6oXrLfKnDD\n" +
            "TzQ14+G3vvVkTebpWAXRBLv9penmllbd+xyPrhcQ7DzBW6ZZqWEaRPartd0F4YMv\n" +
            "JwU1EIMir2txAiNjPTFQW1PA1MPQnZ6f1v+oRrtX7Kp8rQ1ExucS\n" +
            "-----END RSA PRIVATE KEY-----";
    public  static final String RSA_PUBLICA = "-----BEGIN PUBLIC KEY-----\n" +
            "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApQvtn7LCEAb8hHGTFhwe\n" +
            "hAYIsHW1BGXzRt7BCpxXy1h/7BXCw1x/cunLFmp9HV6+CkWXJoRo29ob/Gf87nk7\n" +
            "x5pLidHz11zeGfklm6WGKuqqdvHcQ3qa4xhDbas3yjRgNtksvlNbwA1NLxxNVUCX\n" +
            "CnVIFTD5uUmAL5kXV3LT9u0TDnSUFmO5g4Or8C9CqKqQ8rfcfm9xiW+DiBGgBXBo\n" +
            "zyky383LNmoKQtmDAQLBKbZ9UYLxiRC1yHU1aEPOahTa66jMTcQdO5fqPkytNws6\n" +
            "OhDPjaoSOTei51yxMbzNEZTwlVczzZ2QDmsiR93wnF2Agf/4YU4MWYAsBVlrkRWO\n" +
            "/wIDAQAB\n" +
            "-----END PUBLIC KEY-----";
}
